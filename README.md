# Sole Pane

vim の `Ctrl+W o`(`:only`)のように、フォーカス中の分割(タブグループ)以外の分割をすべて閉じます。フォーカス中の分割にあるタブは、すべてそのまま残します。

## Obsidian 標準コマンドとの違い

| コマンド | 他の分割 | 現在の分割の他タブ |
| --- | --- | --- |
| 他のタブをすべて閉じる(`workspace:close-others`) | 閉じる | **閉じる** |
| タブグループ内の他のタブを閉じる(`workspace:close-others-tab-group`) | 残す | 閉じる |
| **Close other splits**(このプラグイン) | 閉じる | 残す |

- ピン留めしたタブは閉じません(標準コマンドと同じ扱いです)。そのタブがある分割も残ります。
- 対象は、フォーカス中のタブがあるウィンドウ(メインウィンドウかポップアウトウィンドウ)だけです。サイドバーと他のウィンドウは変わりません。
- サイドバーにフォーカスがあるときと、閉じる分割がないときは何もしません(コマンドパレットにも出ません)。

## vimrc での割り当て

[Vimrc Support](https://github.com/esm7/obsidian-vimrc-support) を使っている場合の例です。

```vim
exmap only obcommand sole-pane:close-other-splits
nmap <C-w>o :only<CR>
```

`<C-w><C-o>` も割り当てられますが、Ctrl+O が Obsidian のホットキーに割り当てられていると、そちらが先に実行されます(既定ではクイックスイッチャーを開きます)。
