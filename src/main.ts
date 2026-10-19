import { Platform, Plugin, WorkspaceContainer, WorkspaceItem, WorkspaceLeaf, WorkspaceParent } from "obsidian";

function collectLeaves(item: WorkspaceItem, out: WorkspaceLeaf[]) {
	if (item instanceof WorkspaceLeaf) out.push(item);
	else for (const child of (item as WorkspaceParent & { children: WorkspaceItem[] }).children) collectLeaves(child, out);
}

export default class SolePanePlugin extends Plugin {
	onload() {
		// Vim's <C-w>o (:only). Obsidian's tab group plays the role of a vim
		// window, so keep the active tab group with all its tabs and close the
		// rest of its window. Pinned tabs survive, as with workspace:close-others.
		this.addCommand({
			id: "close-other-splits",
			name: "Close other splits",
			checkCallback: (checking) => {
				const { workspace } = this.app;
				const leaf = workspace.activeLeaf;
				if (!leaf || Platform.isPhone) return false;
				const root = leaf.getRoot();
				if (root === workspace.leftSplit || root === workspace.rightSplit) return false;
				const leaves: WorkspaceLeaf[] = [];
				collectLeaves(leaf.getContainer() as WorkspaceContainer, leaves);
				const targets = leaves.filter((l) => l.parent !== leaf.parent && !l.getViewState().pinned);
				if (targets.length === 0) return false;
				if (!checking) {
					for (const l of targets) l.detach();
					workspace.setActiveLeaf(leaf, { focus: true });
				}
				return true;
			},
		});
	}
}
