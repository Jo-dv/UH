package org.project.uh.util;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class RandomNumberUtil{
    public static long create() {
        SecureRandom sr = null;
        try {
            sr = SecureRandom.getInstanceStrong();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        return (long) (sr.nextDouble() * Math.pow(10, 16));
    }
}
