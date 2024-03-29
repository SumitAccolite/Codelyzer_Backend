package com.example.CompilerDemo.compiler;

import javax.tools.*;
import java.io.*;
import java.lang.reflect.Method;
import java.net.URI;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JavaCompiler {
    public CompilationResult compile(String javaCode) {
        javax.tools.JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        if (compiler == null) {
            return new CompilationResult(false,"No System Java Compiler Available");
        }

        String generatedClassName = extractClassName(javaCode);
        if(!generatedClassName.equals("0")) {
            // Create a compilation task
            DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
            javax.tools.JavaCompiler.CompilationTask task = compiler.getTask(null, null, diagnostics, null, null, Arrays.asList(new JavaSourceFromString(generatedClassName, javaCode)));

            // Perform the compilation
            boolean compilationSuccess = task.call();

            if (compilationSuccess) {
                return new CompilationResult(true, null);
                // Run the compiled class
            } else {
                StringBuilder errorDetails = new StringBuilder();
                for (Diagnostic<? extends JavaFileObject> diagnostic : diagnostics.getDiagnostics()) {
                    errorDetails.append(diagnostic.getMessage(null)).append("\n");
                }
                return new CompilationResult(false, errorDetails.toString());
            }
        }
        return new CompilationResult(false, "Class name not found in the provided Java code.");
    }

    public String runCompiledClass(String className, String[] input) {
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PrintStream printStream = new PrintStream(outputStream);

            // Redirect System.out to capture the output
            PrintStream originalOut = System.out;
            System.setOut(printStream);

            // Load the compiled class
            URLClassLoader classLoader = new URLClassLoader(new URL[]{new File("./").toURI().toURL()});
            Class<?> loadedClass = classLoader.loadClass(className);

            // Check if the class has a main method
            Method mainMethod = loadedClass.getMethod("main", String[].class);

            // Prepare user input if needed
            String[] userInput = input;

            // Invoke the main method
            mainMethod.invoke(null, (Object) userInput);

            // Restore the original System.out
            System.setOut(originalOut);

            // Convert the captured output to a String
            return outputStream.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Helper class to represent a simple Java source code object
    static class JavaSourceFromString extends SimpleJavaFileObject {
        private final String code;

        JavaSourceFromString(String name, String code) {
            super(URI.create("string:///" + name.replace('.', '/') + Kind.SOURCE.extension), Kind.SOURCE);
            this.code = code;
        }

        @Override
        public CharSequence getCharContent(boolean ignoreEncodingErrors) {
            return code;
        }
    }

    public String extractClassName(String javaCode) {
        Pattern pattern = Pattern.compile("public\\s+class\\s+(\\w+)");
        Matcher matcher = pattern.matcher(javaCode);

        if (matcher.find()) {
            return matcher.group(1);
        } else {
            return "0";
        }
    }
}