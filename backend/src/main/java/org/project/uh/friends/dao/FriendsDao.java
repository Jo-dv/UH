package org.project.uh.friends.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.project.uh.friends.dto.FriendRequestDto;
import org.project.uh.friends.dto.FriendRseponseDto;

@Mapper
public interface FriendsDao {

	//친구 요청
	@Insert("insert into friends(from_user_seq,to_user_seq) values(#{fromUserSeq},#{toUserSeq})")
	public int sendRequest(FriendRequestDto friendRequestDto);

	//친구 유무 체크용
	@Select("select count(*) from friends where from_user_seq = #{fromUserSeq} and to_user_seq = #{toUserSeq} "
		+ "or from_user_seq=#{toUserSeq} and to_user_seq=#{fromUserSeq};")
	public int checkFriends(FriendRequestDto friendRequestDto);

	//친구 리스트(from 기준)
	@Select("SELECT f.friends_id, f.to_user_seq, f.friends_state, u.user_nickname \n"
		+ "FROM friends f JOIN user u ON f.to_user_seq = u.user_seq\n"
		+ "WHERE f.from_user_seq = #{userSeq} AND f.friends_state = true;")
	@Result(column = "to_user_seq", property = "userSeq")
	public List<FriendRseponseDto> listToFriends(int userSeq);

	//친구 리스트(to 기준)
	@Select(" SELECT f.friends_id, f.from_user_seq, f.friends_state, u.user_nickname\n"
		+ "        FROM friends f\n"
		+ "        INNER JOIN user u ON f.from_user_seq = u.user_seq\n"
		+ "        WHERE f.to_user_seq = #{userSeq};")
	@Result(column = "from_user_seq", property = "userSeq")
	public List<FriendRseponseDto> listFromFriends(int userSeq);

	//친구 요청 수락
	@Update("update friends SET friends_state = true WHERE friends_id = #{friendsId};")
	public int acceptFriends(int friendsId);

	@Delete("delete from friends where friends_id=#{friendsId};")
	public int deleteFriends(int friendsId);
}
