---
name: interview-qa-manager
description: This skill should be used when the user asks frontend interview questions or requests to generate, save, or manage frontend interview Q&A content. It helps generate high-quality answers and automatically saves them to the appropriate VitePress documentation categories (HTML/CSS/JS/React/Algorithm/Network etc.). Use this skill when the user wants to create interview questions, get answers to technical questions, or organize interview materials.
---

# 前端面试题生成与管理助手

## 概述

这个 skill 专门用于生成和管理前端面试题，能够：
- 根据用户的问题生成高质量、结构化的答案
- 自动识别问题类型并归类到合适的 VitePress 文档目录
- 支持创建新的分类目录
- 将面试题保存为标准的 Markdown 格式
- 维护项目的面试题知识库

## 使用场景

当用户提出以下类型的请求时，使用此 skill：

1. **提问场景**
   - "什么是闭包？"
   - "解释一下 React Hooks 的原理"
   - "HTTP 和 HTTPS 的区别是什么？"

2. **生成请求**
   - "帮我生成一道关于事件循环的面试题"
   - "写一道 CSS 布局的面试题"

3. **保存管理**
   - "把这道题保存到 JavaScript 分类"
   - "创建一个新的 Vue 面试题分类"
   - "把这个问题加到手写代码系列"

## 工作流程

### 步骤 1：理解问题

当用户提问或请求生成面试题时：

1. **明确问题内容**：确保理解用户想要的问题类型和深度
2. **识别技术领域**：判断问题属于哪个技术分类
3. **确定目标位置**：决定应该保存到哪个文件

### 步骤 2：生成答案

根据问题生成高质量的回答，遵循以下原则：

1. **结构完整**：
   - 简要回答（核心要点）
   - 详细解答（深入说明）
   - 代码示例（如适用）
   - 应用场景
   - 注意事项
   - 相关问题

2. **内容质量**：
   - 技术准确性：确保概念和代码正确
   - 深度适中：既要全面又要聚焦重点
   - 实用性强：关注面试中的考察点
   - 示例清晰：代码可运行，注释充分

3. **格式规范**：
   - 使用 `references/markdown_template.md` 中定义的标准格式
   - 保持一致的标题层级和结构
   - 代码块指定语言类型

### 步骤 3：分类决策

根据问题内容，确定保存位置。参考 `references/categories.md` 中的分类规则：

#### 主要分类映射

| 技术领域 | 保存路径 | 关键词 |
|---------|---------|--------|
| HTML | `docs/pages/interview/all/html.md` | 标签、语义化、DOCTYPE、表单 |
| CSS | `docs/pages/interview/all/css.md` | 选择器、布局、flex、动画、BFC |
| JavaScript | `docs/pages/interview/all/js.md` | 闭包、原型、Promise、ES6+ |
| React | `docs/pages/react/reactinterview/common.md` | Hook、组件、Redux、虚拟DOM |
| Vue | `docs/pages/interview/all/vue.md` | 响应式、Vuex、组件通信 |
| 手写代码 | `docs/pages/handwriting/handwriting.md` | 手写、实现、封装 |
| 算法 | `docs/pages/algorithm/algorithm.md` | 算法、数据结构、排序 |
| 网络 | `docs/pages/network/overview.md` | HTTP、TCP、缓存、跨域 |
| TypeScript | `docs/pages/summary/ts.md` | 类型、泛型、接口 |

#### 决策流程

1. **检查现有分类**：优先使用现有的分类文件
2. **评估新建需求**：如果现有分类不合适，考虑新建
3. **询问用户偏好**：对于不明确的情况，询问用户想要保存的位置
4. **提供建议**：主动建议最合适的保存位置

### 步骤 4：保存面试题

使用 `scripts/add_question.py` 脚本将内容保存到目标文件：

```python
from scripts.add_question import add_question_to_file, create_category_file

# 添加到现有文件
add_question_to_file(
    file_path="/Users/linjuncheng/Desktop/m-p/linjunc.github.io/docs/pages/interview/all/html.md",
    question_content=generated_content,
    append=True  # True=追加到末尾, False=插入到开头
)

# 创建新分类（如果需要）
create_category_file(
    file_path="/Users/linjuncheng/Desktop/m-p/linjunc.github.io/docs/pages/interview/all/vue.md",
    category_name="Vue 面试题",
    description="Vue.js 相关的面试题合集"
)
```

#### 保存策略

- **追加模式（默认）**：将新问题添加到文件末尾，适合大多数情况
- **插入模式**：将新问题插入到开头，适合时效性强的内容
- **新建文件**：当现有分类不满足需求时，创建新的分类文件

### 步骤 5：确认和反馈

完成保存后：

1. **确认保存位置**：告知用户内容已保存到哪个文件
2. **提供文件路径**：给出相对于项目根目录的路径
3. **后续建议**：提示用户可以继续添加相关问题或查看已保存内容

## 最佳实践

### 生成答案时

1. **分层递进**：从简单到复杂，先给核心答案再展开
2. **理论结合实践**：概念解释后提供实际代码示例
3. **突出重点**：使用**粗体**标记关键概念
4. **完整性**：确保答案能独立理解，不依赖外部上下文

### 分类管理时

1. **保持一致性**：遵循现有的文件组织结构
2. **合理粒度**：避免创建过多细分类别，保持结构清晰
3. **灵活应变**：根据内容特点选择最合适的分类
4. **用户意愿优先**：如果用户明确指定位置，优先尊重用户选择

### 内容质量

1. **准确性第一**：宁可少写也不要写错
2. **与时俱进**：关注最新的技术趋势和最佳实践
3. **面试导向**：聚焦面试中常见的考察点
4. **示例可运行**：提供的代码应该能够直接运行或清晰表达意图

## 交互模式

### 模式 1：直接问答
用户直接提问，AI 生成答案并建议保存位置。

**示例对话**：
```
用户："什么是防抖和节流？"
AI：
1. 生成关于防抖和节流的详细答案
2. 建议保存到 docs/pages/interview/all/js.md
3. 询问用户是否保存
```

### 模式 2：指定分类
用户提问并指定要保存的分类。

**示例对话**：
```
用户："解释一下 Fiber 架构，保存到 React 面试题"
AI：
1. 生成 Fiber 架构的详细答案
2. 直接保存到 docs/pages/react/reactinterview/common.md
3. 确认保存成功
```

### 模式 3：批量生成
用户请求生成一系列相关问题。

**示例对话**：
```
用户："生成 5 道关于 Promise 的面试题"
AI：
1. 生成 5 道不同角度的 Promise 面试题
2. 统一保存到 JavaScript 分类
3. 提供问题清单和保存确认
```

### 模式 4：创建新分类
用户需要创建新的技术分类。

**示例对话**：
```
用户："创建一个 Vue3 Composition API 的面试题分类"
AI：
1. 创建新文件 docs/pages/interview/all/vue3-composition.md
2. 设置合适的标题和描述
3. 确认新分类已创建
```

## 资源说明

### references/categories.md
包含完整的分类体系和规则：
- 现有目录结构
- 分类映射规则
- 路径命名规范
- 新建分类指南

在需要确定保存位置时查阅此文件。

### references/markdown_template.md
定义了标准的面试题格式：
- 标题层级规范
- 内容结构模板
- 代码块格式
- 质量要求

生成答案时严格遵循此模板。

### scripts/add_question.py
Python 脚本，用于将内容写入文件：
- `add_question_to_file()`: 添加面试题到现有文件
- `create_category_file()`: 创建新的分类文件
- 支持追加和插入两种模式
- 自动创建不存在的目录

## 注意事项

1. **路径使用绝对路径**：始终使用完整的绝对路径 `/Users/linjuncheng/Desktop/m-p/linjunc.github.io/docs/...`

2. **文件编码**：所有文件使用 UTF-8 编码

3. **Markdown 兼容性**：生成的内容要兼容 VitePress 的 Markdown 扩展语法

4. **避免重复**：在添加新内容前，可以先检查是否已存在类似问题

5. **保持格式一致**：严格遵循现有文件的格式风格

6. **代码质量**：提供的代码示例应该是最佳实践，避免过时的写法

7. **及时更新**：关注前端技术发展，定期更新过时内容

## 示例：完整工作流

**用户请求**："解释一下 React 的 useEffect 清理函数，保存到 React 分类"

**AI 执行步骤**：

1. **生成结构化答案**（遵循 markdown_template.md）：
```markdown
## useEffect 的清理函数是什么？

### 简要回答
useEffect 的清理函数是在组件卸载或下次 effect 执行前运行的函数，用于清理副作用，如取消订阅、清除定时器等。

### 详细解答
[详细内容...]

### 代码示例
[代码示例...]

### 应用场景
[场景说明...]

### 注意事项
[注意事项...]
```

2. **确定保存位置**（参考 categories.md）：
   - 识别为 React 相关问题
   - 目标文件：`docs/pages/react/reactinterview/common.md`

3. **执行保存**：
```python
add_question_to_file(
    file_path="/Users/linjuncheng/Desktop/m-p/linjunc.github.io/docs/pages/react/reactinterview/common.md",
    question_content=generated_markdown,
    append=True
)
```

4. **确认反馈**：
   - ✅ 已将问题保存到：`docs/pages/react/reactinterview/common.md`
   - 可以继续添加其他 React 相关问题

## 持续改进

随着使用过程的进行，可以：
- 扩充分类体系
- 优化答案模板
- 添加更多技术领域
- 改进分类算法
- 增强内容质量检查
