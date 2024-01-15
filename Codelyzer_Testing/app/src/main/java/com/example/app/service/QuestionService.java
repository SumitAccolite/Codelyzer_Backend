package com.example.app.service;

import com.example.app.dto.QuestionDTO;

import java.util.List;

public interface QuestionService {
    public List<QuestionDTO>  getAllQuestionByUserId(Long id);
}
