import { create } from "zustand";

interface ProblemDescriptionEditorState {
  language: string;
  problemDescription: string;
  setProblemDescription: (problemDescription: string) => void;
}

export const useProblemDescriptionEditorStore =
  create<ProblemDescriptionEditorState>((set) => ({
    language: "mdx",
    problemDescription: `# Judge4c 题目描述编辑界面

Judge4c 提供了一个基于 Markdown 的题目描述编辑界面，支持代码块、行号显示、行高亮等功能，方便用户编写和展示代码题解。

## 代码块

使用传统的 Markdown 语法可以轻松定义代码块：

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## 行号显示

通过添加 \`showLineNumbers\` 参数，可以在代码块中显示行号，便于代码讲解和调试：

\`\`\`java showLineNumbers
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## 行高亮

结合 \`showLineNumbers\`，您还可以高亮指定行，帮助用户快速定位关键代码：

1. **高亮单行或多行**：使用 \`{1,3,5}\` 高亮第1行、第3行和第5行。

\`\`\`java showLineNumbers {1,3,5}
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

2. **高亮连续行**：使用 \`{3-5}\` 高亮第3行到第5行。

\`\`\`java showLineNumbers {3-5}
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## 单词突出显示

在代码块中使用 \`/pattern/\` 可以突出显示匹配的单词：

\`\`\`java showLineNumbers /println/
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.print("Hello, Judge4c!");
        System.out.println("Hello, println!");
    }
}
\`\`\`

## 内联代码

在文本中插入内联代码可以帮助用户更好地理解题目要求或技术细节。Markdown 提供了简单的方式来插入内联代码，但默认不支持语法高亮。通过 \`rehype-pretty-code\` 可以支持根据编程语言进行高亮显示。

### 基本用法
使用反引号 \` 包裹代码即可插入内联代码。例如：
- 普通内联代码：\`print("Hello, World!")\`

### 支持语法高亮
为了支持代码高亮，可以在内联代码结尾使用扩展语法\`\\{:language}\`，其中 \`language\` 是编程语言的名称。例如：
- Java 代码：\`System.out.println("Hello, World!");{:java}\`
- Python 代码：\`print("Hello, World!"){:python}\`

这种方式不仅保留了内联代码的简洁性，还能根据语言特性高亮显示，提升阅读体验。

### 示例
- 普通内联代码：\`int x = 10;\`
- 高亮内联代码：\`int x = 10;{:java}\`

通过这种方式，您可以更清晰地展示代码片段，同时保持文本的流畅性。

## 标题与字幕

通过 \`title\` 和 \`caption\` 参数可以为代码块添加标题和字幕，方便用户理解代码的作用：

\`\`\`java showLineNumbers title="Hello, World!" caption="示例代码"
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## ANSI 高亮

ANSI 高亮可以用来展示编译错误、运行结果等信息，提升用户体验。例如：

\`\`\`ansi
[0;31mHelloWorld.java:3: error: ';' expected[0m
  System.out.println("Hello, World!")
[0;31m                                      ^[0m
[0;31m1 error[0m
\`\`\`

## 主题

Judge4c 采用了 \`github-markdown-css\` 主题，并基于 \`github-light-default\` 和 \`github-dark-default\` 主题对 \`globals.css\` 进行了定制化调整，以确保与 Markdown 主题风格一致。

此外, Judge4c 支持自动跟随系统主题切换，提供无缝的亮色和暗色模式体验。

## GFM 支持

Judge4c 支持 GFM (GitHub Flavored Markdown) 语法，包括以下功能:

### 任务列表

- [x] 任务1
- [ ] 任务2
- [X] 任务3

### 表格

|   语言   |   作者   |   项目   |
| -------- | -------- | -------- |
|  Nextjs  | NGC2207  | Judge4c  |
`,
    setProblemDescription: (problemDescription) => set({ problemDescription }),
  }));
