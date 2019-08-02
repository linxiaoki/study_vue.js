直接 activeKey  传入，按顺序判断name，
    若 activeKey === name ,则激活，
    之后将 name 和 activeKey 都用 index 表示。（唯一）

而 pdf里面，
    如果name 不存在，就用 index 替代，但是可能会冲突。