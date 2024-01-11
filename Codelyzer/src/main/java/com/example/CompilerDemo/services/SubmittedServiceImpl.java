package com.example.CompilerDemo.services;

import com.example.CompilerDemo.entity.TestCase;
import com.example.CompilerDemo.dto.SubmittedDTO;
import com.example.CompilerDemo.dto.TestCaseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class SubmittedServiceImpl implements SubmittedService {
    @Autowired
    TestCaseService testCaseService;

    @Override
    public void submitCode(SubmittedDTO code) throws IOException, InterruptedException {
        if (code.getLanguage().equals("java")) {
            DemoJavaCompiler compiler = new DemoJavaCompiler();

            //checking if the code runs without compilation error
            if (compiler.compile(code.getSubmittedCode())) {
                System.out.println("Compilation Successful");

                List<TestCase> testCases = testCaseService.getAllTestCases();
                int temp = 0;
                for (TestCase testCase : testCases) {

                    //getting the test case input and output
                    TestCaseDTO test = new TestCaseDTO(testCase.getTestCaseInput(), testCase.getTestCaseOutput());
                    String[] input = test.getTestCaseInput().split(" ");
                    String generatedClassName = compiler.extractClassName(code.getSubmittedCode());

                    //executing the code
                    String output = compiler.runCompiledClass(generatedClassName, input);

                    //Function to check if the test cases and output is matching
                    checkTestCase(test, temp, output);

                    //incrementing temp to show only 3 testcases
                    temp++;
                }
            } else
                System.out.println("Compilation Failed");
        }
        // cpp compiler
        else {
            DemoCppCompiler cppCompiler = new DemoCppCompiler();
            if (cppCompiler.compileCpp(code.getSubmittedCode())) {
                System.out.println("Compilation Successful");
                List<TestCase> testCases = testCaseService.getAllTestCases();
                int temp = 0;
                for (TestCase testCase : testCases) {
                    TestCaseDTO test = new TestCaseDTO(testCase.getTestCaseInput(), testCase.getTestCaseOutput());
                    String output = cppCompiler.executeCpp(test.getTestCaseInput());
                    checkTestCase(test,temp,output);
                    temp++;
                }
            }
            else {
                System.out.println("Compilation Failed");
            }
        }
    }

    public void checkTestCase(TestCaseDTO test,int temp,String output){
        if (test.getTestCaseOutput().equals(output))
            System.out.println("Test Case Successful");
        else {
            if (temp < 3) {
                System.out.println("Your Output: " + output);
                System.out.println("Expected Output: " + test.getTestCaseOutput());
                System.out.println("Failed");
            } else {
                System.out.println("Failed");
            }
        }
    }
}
