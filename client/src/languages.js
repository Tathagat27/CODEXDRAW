export const LANGUAGE_VERSIONS = {
    cpp14: "cpp",
    nodejs: "javascript",
    python3: "python",
    java: "java",
    csharp: "csharp",
    php: "php",
};

export const CODE_SNIPPETS = {
    cpp14: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
}
`,
    nodejs: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    python3: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp:
        'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
    php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};