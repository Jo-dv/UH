package org.project.uh.util;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class RandomNumberUtil {
	private RandomNumberUtil() {
		// 유틸리티 클래스이므로 인스턴스 생성 방지
	}

	public static long create() {
		SecureRandom sr = null;
		try {
			sr = SecureRandom.getInstanceStrong();
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
		return (long)(sr.nextDouble() * Math.pow(10, 16));
	}
}
