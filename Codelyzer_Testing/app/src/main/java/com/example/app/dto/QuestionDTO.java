package com.example.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class QuestionDTO {
    private Long questionId;
    private String questionTitle;
    private String questionDesc;
}
