import { Modal, Notice } from "obsidian";
import { ContextEditor } from "../contexts/contextEditor";
import { ContextEditCodeblocks } from "../contextEditCodeblock";
import UNITADE_PLUGIN from "../../main";

export class FenceEditModal extends Modal {
	private codeEditor!: ContextEditor;

	private constructor(
		private plugin: UNITADE_PLUGIN,
		private code: string,
		private language: string,
		private onSave: (changedCode: string) => void
	) {
		super(plugin.app);
	}

	onOpen() {
		super.onOpen();

		this.codeEditor = new ContextEditor(
			this.contentEl,
			this.plugin,
			this.code,
			this.language,
		);

		this.modalEl.setCssProps({
			"--dialog-width": "90vw",
			"--dialog-height": "90vh",
		});
        
		this.modalEl.style.height = "var(--dialog-height)";

		const closeButton = this.modalEl.querySelector<HTMLDivElement>(".modal-close-button");

		closeButton!.style.background = "var(--modal-background)";
		closeButton!.style.zIndex = `${Number.MAX_SAFE_INTEGER}`;
	}

	onClose() {
		super.onClose();

		this.onSave(this.codeEditor.getValue());
	}

	static openOnCurrentCode(plugin: UNITADE_PLUGIN) {
		const context = ContextEditCodeblocks.create(plugin);

		if (!context.isInFence()) {
			if(plugin.settings.silence_errors)
                console.debug('SILENCED ERROR: Notice("Not valid codeblock");');
            else
                new Notice("Not valid codeblock");

			return;
		}

		const fenceData = context.getFenceData();

		if (!fenceData) return;
        else
            new FenceEditModal(
                plugin,
                fenceData.content,
                fenceData.language,
                (value) => context.replaceFenceContent(value)
            ).open();
	}
}
