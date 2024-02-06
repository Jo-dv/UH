package org.project.uh.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordHashUtil {

    private PasswordHashUtil() {
        // 유틸리티 클래스이므로 인스턴스 생성 방지
    }

    public static String hashPassword(String password) {
        try {
            // SHA-256 알고리즘을 사용한 MessageDigest 객체 생성
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // 비밀번호 문자열을 바이트 배열로 변환하여 해싱
            byte[] hashedPasswordBytes = digest.digest(password.getBytes());

            // 해싱된 바이트 배열을 16진수 문자열로 변환
            StringBuilder hashedPassword = new StringBuilder();
            for (byte b : hashedPasswordBytes) {
                hashedPassword.append(String.format("%02x", b));
            }

            // 해싱된 비밀번호를 반환
            return hashedPassword.toString();

        } catch (NoSuchAlgorithmException e) {
            // 알고리즘이 지원되지 않을 경우의 예외 처리
            throw new RuntimeException("Failed to hash password", e);
        }
    }
}
