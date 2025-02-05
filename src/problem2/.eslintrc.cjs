/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:jsx-a11y/recommended",
        "plugin:@typescript-eslint/recommended",
        "eslint-config-prettier",
        "prettier",
    ],
    overrides: [{
        files: ["src/**/*.ts", "src/**/*.tsx", "vitest.config.ts"],
    }, ],
    plugins: ["prettier"],
    settings: {
        react: {
            // Nói eslint-plugin-react tự động biết version của React.
            version: "detect",
        },
        // Nói ESLint cách xử lý các import
        "import/resolver": {
            node: {
                paths: [path.resolve(__dirname, "")],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
            typescript: {
                project: path.resolve(__dirname, "./tsconfig.json"),
            },
        },
    },
    env: {
        node: true,
    },
    rules: {
        "no-undef": 0,
        "no-lone-blocks": 0,
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "no-unused-expressions": "off", // cảnh báo một biểu thức không được sử dụng và ko liên quan đến logic
        "no-unused-vars": 0, // các biến không được sử dụng -  recommened
        "@typescript-eslint/no-unused-vars": 0,
        "no-empty-interface": 0,
        "@typescript-eslint/no-empty-interface": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "no-constant-condition": 0, //if(true, flase) .... - recommened
        "no-await-in-loop": 0, // không tận dụng được lợi thế của async/await(vd await từng phần tử trong vòng for)
        "no-return-await": 0, // lỗi khi sử dụng return await
        "no-empty": "off", // các khối trống(vd: if(foo){}, while(foo){})- recommened
        "no-continue": "off", // sử dụng sai cách từ khoá continue
        "arrow-parens": "off", // sử dụng nhất quán dấu ngoặc đơn ở các arrow function - recommend
        "arrow-body-style": "off", // Có thể thực thi hoặc không cho phép sử dụng dấu ngoặc nhọn xung quanh thân hàm arrow.- recommened
        "object-curly-newline": "off", // thực thi ngắt dòng khi kết thúc bằng dấu dấu ngoặc, các object trong array.. - recommened
        "no-return-assign": "off", // loại bỏ các phép gán khỏi câu lệnh trả về(vd loại bỏ: return foo = bar + 2; )
        "linebreak-style": 0, //  thực thi cách kết thúc dòng nhất quán độc lập với hệ điều hành - recommened
        "import/extensions": 0,
        "import/no-unresolved": 0,
        "import/no-extraneous-dependencies": "off",
        "import/prefer-default-export": 0,
        "react/state-in-constructor": "off",
        "react/jsx-no-duplicate-props": "off",
        "react/prop-types": [0],
        "react/jsx-wrap-multilines": "off",
        "react/jsx-props-no-spreading": "off",
        "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/no-array-index-key": "off",
        "react/require-default-props": "off",
        "react/react-in-jsx-scope": "off",
        "react/function-component-definition": [
            "error",
            {
                namedComponents: [
                    "function-declaration",
                    "function-expression",
                    "arrow-function",
                ],
                unnamedComponents: ["function-expression", "arrow-function"],
            },
        ],
    },
};