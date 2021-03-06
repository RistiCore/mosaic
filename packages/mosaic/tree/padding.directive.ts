import { Directive, Input, OnInit } from '@angular/core';
import { CdkTreeNodePadding } from '@ptsecurity/cdk/tree';


@Directive({
    selector: '[mcTreeNodePadding]',
    providers: [{ provide: CdkTreeNodePadding, useExisting: McTreeNodePadding }]
})
export class McTreeNodePadding<T> extends CdkTreeNodePadding<T> implements OnInit {
    @Input('mcTreeNodePadding') level: number;

    @Input('mcTreeNodePaddingIndent') indent: number;

    baseLeftPadding: number = 12;
    /* tslint:disable-next-line:naming-convention orthodox-getter-and-setter*/
    _indent: number = 20;

    withIcon: boolean;
    iconWidth: number = 20;

    get leftPadding(): number {
        return (this.withIcon ? 0 : this.iconWidth) + this.baseLeftPadding;
    }

    paddingIndent(): string | null {
        const nodeLevel = (this.treeNode.data && this.tree.treeControl.getLevel)
            ? this.tree.treeControl.getLevel(this.treeNode.data)
            : 0;

        const level = this.level || nodeLevel;

        return level > 0 ? `${(level * this._indent) + this.leftPadding}px` : `${this.leftPadding}px`;
    }

    ngOnInit(): void {
        this.withIcon = this.tree.treeControl.isExpandable(this.treeNode.data);

        this.setPadding();
    }
}
