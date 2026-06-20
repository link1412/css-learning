/**
 * 各章节的「完成基准」自测题。
 * key = moduleId，value = 自测问题列表（中文）。
 * 渲染为章节末尾可勾选的清单（SelfCheckCard），勾选状态存 localStorage。
 * 题目基于第 0 章「完成基准」与各章核心概念，答得上才算过。
 */
export const selfCheck: Record<string, string[]> = {
  method: [
    '能用自己的话说清「模块化、Level、Snapshot、成熟度」四者的关系吗？',
    '能默写八环概念依赖链，并解释为什么「取值过程」排在「盒模型」之前吗？',
    '拿到任意属性，能读懂它的 Value 行（值定义语法）并说出它是否继承吗？',
    '能说清「为什么 computed≠used 只发生在依赖布局的属性上」吗？',
  ],
  intro: [
    '能说出 CSS 属性的三个组成部分（名称、值域、行为）吗？',
    '能解释「层叠」与「继承」分别解决什么问题吗？',
    '能复述值处理六阶段的名称（declared→…→actual）吗？',
  ],
  syntax: [
    '能说出 CSS 解析的两个阶段（tokenize → parse）吗？',
    '遇到无法识别的声明，浏览器如何处理（容错 / 前向兼容解析）？',
    '能读懂 `<length>`、`A || B`、`#`、`{1,4}` 这些值定义记号吗？',
  ],
  selectors: [
    '能徒手算任意选择器的 (A,B,C) 特异度三元组吗？',
    '`:is()`、`:where()`、`:not()` 对特异度各有什么影响？',
    '浏览器为什么从右到左匹配选择器？这对性能有何含义？',
  ],
  cascade: [
    '能口述层叠排序的维度顺序（来源与重要性 → 层 → 特异性 → 顺序）吗？',
    '能解释 `!important` 如何反转作者样式与用户样式的强弱吗？',
    '`@layer` 的优先级在普通规则与 `!important` 下分别怎么比较？',
    'declared→cascaded→specified→computed→used→actual，每一步在哪里发生？',
  ],
  'box-model': [
    '能说出盒子的四个区域（content / padding / border / margin）吗？',
    '外边距合并（margin collapsing）在哪些情况下发生？',
    '`box-sizing: border-box` 改变了 width 的计算口径吗？怎么变？',
  ],
  'writing-modes': [
    '能区分「物理 / 流向相对 / 行相对」三套方向吗？',
    '竖排（vertical-rl）时 `inline-size` 控制的是宽还是高？',
    '为什么说书写模式是 Flexbox / Grid 的坐标系基础？',
  ],
  'visual-formatting': [
    '什么是包含块（containing block）？谁决定一个盒的包含块？',
    'BFC 是什么？它能解决哪些经典问题（清除浮动、阻止 margin 穿透）？',
    '`position`、`float`、`display` 三者的相互关系（CSS2 §9.7）是什么？',
  ],
  flexbox: [
    '`flex-direction: row` 时主轴是「水平」还是「inline 维度」？两者何时不同？',
    '`flex-grow` / `flex-shrink` / `flex-basis` 三者如何共同决定弹性项最终尺寸？',
    '`justify-content` 与 `align-items` 分别沿哪个轴对齐？',
  ],
  grid: [
    '显式网格与隐式网格的区别是什么？自动放置算法何时创建隐式轨道？',
    '`fr` 单位与 `minmax()` 各解决什么问题？',
    'subgrid（Level 2）让子网格获得了什么能力？',
  ],
};
