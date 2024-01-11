package com.example.CompilerDemo.services;

import com.example.CompilerDemo.dto.SubmittedDTO;

import java.io.IOException;

public interface SubmittedService {
    public void submitCode(SubmittedDTO code) throws IOException, InterruptedException;

}
