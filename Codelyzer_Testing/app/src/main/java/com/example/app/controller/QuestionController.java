package com.example.app.controller;

import com.example.app.dto.QuestionDTO;
import com.example.app.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("/questions/{userId}")
    public List<QuestionDTO> getAllQuestionsByUSerID(@PathVariable Long userId){
        return questionService.getAllQuestionByUserId(userId);
    }
}
