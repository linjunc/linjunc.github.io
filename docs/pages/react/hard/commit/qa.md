# Q & A

## Q: useEffect 的销毁函数是什么时候执行？

A:

`useEffect` 的销毁函数是在 `commit` 阶段的 `layout` 阶段渲染视图完成之后执行的，`useEffect` 会在 `beforemutation` 阶段以一个 `normal` 的优先级被 `schedule` 调度。
在视图渲染后就会处理这个 `effect`，会先执行 `destroy` 再执行 `create` 。
相比之下，`uselayouteffect` 会在 `mutation` 阶段执行 `destroy` ,`layout` 阶段执行 `create`

## Q: ref 的更新究竟是 mutation 阶段还是 layout 阶段执行的？

准确来说应该是在 `mutation` 阶段会解除 `ref` 的引用，在 `layout` 阶段重新绑定。这里涉及到两个方法，一个是 `commitDetachRef`
还有一个就是 `commitAttachRef`，在 `mutation` 阶段会先用前面的方法接触 `ref` 的引用，在 `DOM` 更新完成后，在 `layout` 阶段会再调用 `commitAttachRef` 去绑定新的 `ref`
