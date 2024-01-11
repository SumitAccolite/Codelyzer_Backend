package com.example.CompilerDemo.services;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class DemoCppCompiler {

    public String writeCodeToTempFile(String code, String fileName, String fileExtension) throws IOException {
        // Define the file path for the temporary file
        Path file = Path.of(fileName + fileExtension);

        // Create the file or override its content if it already exists
        if (!Files.exists(file)) {
            Files.createFile(file);
        }

        // Write the code to the temporary file using BufferedWriter
        try (BufferedWriter writer = Files.newBufferedWriter(file, StandardOpenOption.WRITE)) {
            writer.write(code);
        }

        System.out.println("Code written to temporary file: " + file);
        return file.toString();
    }
    public Boolean compileCpp(String code) throws IOException, InterruptedException {
        // Write the C++ code to a temporary file
        String filePath = writeCodeToTempFile(code, "Temp", ".cpp");

        // Compile the C++ code using g++
        Process compileProcess = new ProcessBuilder("g++", "Temp.cpp", "-o", "Temp_cpp_executable").start();
        compileProcess.waitFor();

        if (compileProcess.exitValue() == 0) {
            return true;
        }
            return false;
    }

    public String executeCpp(String input) throws IOException, InterruptedException {
        // Execute the compiled C++ program
        Process executeProcess = new ProcessBuilder("./Temp_cpp_executable").start();
        InputStream inputDataStream = executeProcess.getInputStream();

        // Provide user-defined input to the C++ program
        executeProcess.getOutputStream().write(input.getBytes());
        executeProcess.getOutputStream().close();

        // Read the output of the C++ program
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputDataStream));
        StringBuilder output = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            output.append(line).append("\n");
        }
        output.replace(output.length()-1,output.length(),"");
        return output.toString();
    }
}
