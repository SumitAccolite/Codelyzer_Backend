package com.example.app.impl;

import com.example.app.dto.QuestionDTO;
import com.example.app.service.QuestionService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Override
    public List<QuestionDTO> getAllQuestionByUserId(Long id) {

        Map<Long,List<QuestionDTO>> questionMap = new HashMap<>();
        List<QuestionDTO> questionList1= Arrays.asList(
                new QuestionDTO(1L,"Addition two numbers","Write Code to give add two number"),
                new QuestionDTO(2L,"Hello World","Write Code to print Hello World")
        );
        List<QuestionDTO> questionList2= Arrays.asList(
                new QuestionDTO(3L,"Subtraction two numbers","Write Code to give sub two number"),
                new QuestionDTO(4L,"Hello ","Write Code to print Hello ")
        );
        List<QuestionDTO> questionList3= Arrays.asList(
                new QuestionDTO(5L,"Multiplication of two numbers","Write Code to give mul two number"),
                new QuestionDTO(6L,"World","Write Code to print World")
        );
        questionMap.put(1L,questionList1);
        questionMap.put(2L,questionList2);
        questionMap.put(3L,questionList3);

        return questionMap.get(id);
    }
}
