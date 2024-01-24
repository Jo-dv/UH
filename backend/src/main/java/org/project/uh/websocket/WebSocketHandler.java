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

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import jakarta.servlet.http.HttpSession;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

	private static final Map<WebSocketSession, HttpSession> CLIENTS = new ConcurrentHashMap<>();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		HttpSession httpSession = (HttpSession)session.getAttributes().get("httpSession");
		// if (isHttpSessionAlreadyConnected(httpSession)) {
		// 	// 이미 연결된 경우 접속을 막고 메시지를 보내고 연결을 종료
		// 	TextMessage errorMessage = new TextMessage("You are already connected from another session.");
		// 	session.sendMessage(errorMessage);
		// 	session.close(CloseStatus.POLICY_VIOLATION);
		// 	return;
		// }
		CLIENTS.put(session, httpSession);

		// 클라이언트 접속 시 모든 클라이언트에게 접속 유저 리스트를 전송
		sendConnectors();
	}

	//동시 접속 여부 확인
	// private boolean isHttpSessionAlreadyConnected(HttpSession httpSession) {
	// 	return CLIENTS.values().contains(httpSession);
	// }

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		CLIENTS.remove(session);

		// 클라이언트 연결 종료 시 모든 클라이언트에게 접속 유저 리스트를 전송 다시 전송
		sendConnectors();
	}

	private void sendConnectors() throws IOException {
		// 현재 접속한 모든 클라이언트의 닉네임 전송
		List<String> connectors = new ArrayList<>();
		for (WebSocketSession client : CLIENTS.keySet()) {
			HttpSession session = (HttpSession)client.getAttributes().get("httpSession");
			UserDto dto = (UserDto)session.getAttribute("loginUser");
			//테스트 코드 - 회원 연결 시 변경
			connectors.add(client.getId());
			//실제 코드
			// connectors.add(dto.getUserNickname());
		}

		// JSON 형식으로 구성
		JsonObject jsonObject = new JsonObject();
		jsonObject.add("connectors", JsonParser.parseString(connectors.toString()));

		// 모든 클라이언트에게 전송
		for (WebSocketSession client : CLIENTS.keySet()) {
			client.sendMessage(new TextMessage(jsonObject.toString()));
		}
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		// 수신된 메시지 파싱
		JsonObject jsonMessage = JsonParser.parseString(message.getPayload()).getAsJsonObject();

		// 메시지 타입이 "notification"인 경우에만 처리
		if (jsonMessage.has("type") && jsonMessage.get("type").getAsString().equals("notification")) {
			System.out.println("here");
			// 알림 내용 추출
			String notificationContent = jsonMessage.get("content").getAsString();
			System.out.println(notificationContent);
			// 여기서 알림을 받은 세션에 대한 추가 처리를 수행
			handleNotification(notificationContent, jsonMessage);
		}
	}

	private void handleNotification(String sessionId, JsonObject jsonMessage) throws IOException {
		// 알림을 받은 세션에 메시지 전송
		TextMessage notificationMessage = new TextMessage(jsonMessage.toString());
		for (WebSocketSession client : CLIENTS.keySet()) {
			if (client.getId().equals(sessionId)) {
				client.sendMessage(notificationMessage);
				break;
			}
		}
	}
}