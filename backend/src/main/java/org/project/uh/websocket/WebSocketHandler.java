package org.project.uh.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.project.uh.user.dto.UserDto;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import jakarta.servlet.http.HttpSession;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

	private static final Map<WebSocketSession, HttpSession> CLIENTS = new ConcurrentHashMap<>();
	private static final Map<String, WebSocketSession> connectionIds = new ConcurrentHashMap<>();
	private static final Map<WebSocketSession, Integer> userList = new ConcurrentHashMap<>();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		HttpSession httpSession = (HttpSession)session.getAttributes().get("httpSession");
		System.out.println(httpSession);
		if (isHttpSessionAlreadyConnected(httpSession)) {
			// 이미 연결된 경우 접속을 막고 메시지를 보내고 연결을 종료
			session.close(CloseStatus.PROTOCOL_ERROR);
			return;
		}

		if (isUserAlreadyLogined(httpSession)) {
			//이미 로그인되어 있는 유저의 재로그인을 막음
			session.close(CloseStatus.BAD_DATA);
			return;
		}

		//로그인 되지 않은 유저의 소켓 연결을 막음
		if (httpSession.getAttribute("user") == null) {
			session.close(CloseStatus.POLICY_VIOLATION);
			return;
		}

		CLIENTS.put(session, httpSession);
		connectionIds.put(session.getId(), session);
		UserDto user = (UserDto)httpSession.getAttribute("user");
		userList.put(session, user.getUserSeq());
		// 클라이언트 접속 시 모든 클라이언트에게 접속 유저 리스트를 전송
		sendConnectors();
	}

	// 동시 접속 여부 확인
	private boolean isHttpSessionAlreadyConnected(HttpSession httpSession) {
		UserDto user = (UserDto)httpSession.getAttribute("user");
		return CLIENTS.containsValue(httpSession);
	}

	private boolean isUserAlreadyLogined(HttpSession httpSession) {
		UserDto user = (UserDto)httpSession.getAttribute("user");
		return userList.containsValue(user.getUserSeq());
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		connectionIds.remove(session.getId());
		CLIENTS.remove(session);
		userList.remove(session);
		// 클라이언트 연결 종료 시 모든 클라이언트에게 접속 유저 리스트를 전송 다시 전송
		sendConnectors();
	}

	private void sendConnectors() throws IOException {
		// 현재 접속한 모든 클라이언트의 connectionId와 닉네임 전송
		List<String[]> connectors = new ArrayList<>();
		for (WebSocketSession client : CLIENTS.keySet()) {
			HttpSession session = (HttpSession)client.getAttributes().get("httpSession");
			UserDto dto = (UserDto)session.getAttribute("user");

			//테스트 코드 - 회원 연결 시 변경
			// connectors.add(new String[] {client.getId(), "닉네임"});
			//실제 코드
			connectors.add(new String[] {client.getId(), String.valueOf(dto.getUserSeq()), dto.getUserNickname()});
		}

		// JSON 형식으로 구성
		JsonArray connectorsArray = new JsonArray();
		for (String[] connector : connectors) {
			JsonObject connectorObject = new JsonObject();
			connectorObject.addProperty("connectionId", connector[0]);
			connectorObject.addProperty("userSeq", Integer.valueOf(connector[1]));
			connectorObject.addProperty("nickname", connector[2]);
			connectorsArray.add(connectorObject);
		}

		JsonObject jsonObject = new JsonObject();
		jsonObject.add("connectors", connectorsArray);

		// 모든 클라이언트에게 전송
		for (WebSocketSession client : CLIENTS.keySet()) {
			client.sendMessage(new TextMessage(jsonObject.toString()));
		}
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// 수신된 메시지 파싱
		JsonObject jsonMessage = JsonParser.parseString(message.getPayload()).getAsJsonObject();

		// 친구 초대(invite)
		if (jsonMessage.has("type") && jsonMessage.get("type").getAsString().equals("invite")) {
			System.out.println("invite");
			// 초대 받는 대상의 connectionId 추출
			String toConnectionId = jsonMessage.get("toConnectionId").getAsString();
			jsonMessage.remove(toConnectionId);
			HttpSession httpSession = CLIENTS.get(session);

			//httpSession을 통해 초대를 보낸 유저의 roomId 추출
			String roomId = (String)httpSession.getAttribute("roomId");
			if (roomId == null)
				jsonMessage.add("roomId", null);
			else
				jsonMessage.add("roomId", JsonParser.parseString(roomId));

			handleInvite(toConnectionId, jsonMessage);
		}//친구 따라가기 
		else if (jsonMessage.has("type") && jsonMessage.get("type").getAsString().equals("follow")) {
			System.out.println("follow");
			// 따라가는 대상의 connectionId 추출
			String connectionId = jsonMessage.get("connectionId").getAsString();
			jsonMessage.remove(connectionId);

			//따라가는 대상의 roomId 추출 후 메시지에 담음
			WebSocketSession followSession = connectionIds.get(connectionId);
			HttpSession followHttpSession = CLIENTS.get(followSession);
			String roomId = (String)followHttpSession.getAttribute("roomId");
			if (roomId == null)
				jsonMessage.add("roomId", null);
			else
				jsonMessage.add("roomId", JsonParser.parseString(roomId));

			handleFollow(session, jsonMessage);
		}//전체에게 새로고침 요청
		else if (jsonMessage.has("type") && jsonMessage.get("type").getAsString().equals("refresh")) {
			handleRefresh(jsonMessage);
		}
	}

	private void handleInvite(String toConnectionId, JsonObject jsonMessage) throws IOException {
		// 초대를 받은 세션에 메시지 전송
		TextMessage inviteMessage = new TextMessage(jsonMessage.toString());
		WebSocketSession session = connectionIds.get(toConnectionId);
		session.sendMessage(inviteMessage);
	}

	private void handleFollow(WebSocketSession session, JsonObject jsonMessage) throws IOException {
		//따라가기를 요청한 세션에 메시시 전송
		TextMessage followMessage = new TextMessage(jsonMessage.toString());
		session.sendMessage(followMessage);
	}

	private void handleRefresh(JsonObject jsonMessage) throws IOException {
		//접속한 모든 유저에게 새로고침 요정을 보냄
		TextMessage refreshMessage = new TextMessage(jsonMessage.toString());

		for (WebSocketSession session : CLIENTS.keySet()) {
			session.sendMessage(refreshMessage);
		}
	}
}