package com.example.CompilerDemo.controller;

import com.example.CompilerDemo.dto.SubmittedDTO;
import com.example.CompilerDemo.services.SubmittedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/test")
public class submissionController {

    @Autowired
    SubmittedService submittedService;
    @PostMapping("/submit")
    public void submitCode(@RequestBody SubmittedDTO code) throws IOException, InterruptedException {
        submittedService.submitCode(code);
    }
}
