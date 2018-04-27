import {NgModule,Component,ElementRef,AfterViewInit,Input,Output,EventEmitter,ContentChild,OnChanges,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule,Header} from '../common/shared'
import {DomHandler} from '../dom/domhandler';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

declare var Quill: any;

export const EDITOR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Editor),
  multi: true
};

@Component({
    selector: 'p-editor',
    template: `
        <div [ngClass]="'ui-widget ui-editor-container ui-corner-all'" [class]="styleClass" attr.aria-label="This is a text editor that allows you to compose and style a body of text">
            <div class="ui-editor-toolbar ui-widget-header ui-corner-top" *ngIf="toolbar">
                <ng-content select="p-header"></ng-content>
            </div>
            <div class="ui-editor-toolbar ui-widget-header ui-corner-top" *ngIf="!toolbar" attr.aria-label="Editor Toolbar">
                <span class="ql-formats">
                    <select class="ql-header" attr.aria-label="Select what type of text this is" title="Select what type of text this is">
                      <option value="1">Heading</option>
                      <option value="2">Subheading</option>
                      <option selected>Normal</option>
                    </select>
                    <select class="ql-font" attr.aria-label="Select font type to use" title="Select font type to use">
                      <option selected>Sans Serif</option>
                      <option value="serif">Serif</option>
                      <option value="monospace">Monospace</option>
                    </select>
                </span>
                <span class="ql-formats" attr.aria-label="Choose which font style to use">
                    <button class="ql-bold" aria-label="Bold"></button>
                    <button class="ql-italic" aria-label="Italic"></button>
                    <button class="ql-underline" aria-label="Underline"></button>
                </span>
                <span class="ql-formats" attr.aria-label="Select colors">
                    <select class="ql-color" attr.aria-label="text color picker" title="Text Color"></select>
                    <select class="ql-background" attr.aria-label="background color picker" title="Background Color"></select>
                </span>
                <span class="ql-formats" attr.aria-label="list types and alignment options">
                    <button class="ql-list" value="ordered" aria-label="Ordered List" title="Ordered List"></button>
                    <button class="ql-list" value="bullet" aria-label="Unordered List" title="Unordered List"></button>
                    <select class="ql-align" attr.aria-label="Select text alignment" title="Align Text">
                        <option selected attr.aria-label="Selected Alignment"></option>
                        <option value="center" attr.aria-label="Align Center" title="Align Center"></option>
                        <option value="right" attr.aria-label="Align Right" title="Align Right"></option>
                        <option value="justify" attr.aria-label="Justify Text" title="Justify Text"></option>
                    </select>
                </span>
                <span class="ql-formats" attr.aria-label="types of insert buttons">
                    <button class="ql-link" aria-label="Insert Link" title="Insert Link"></button>
                    <button class="ql-image" aria-label="Insert Image" title="Insert Image"></button>
                    <button class="ql-code-block" aria-label="Insert Code Block" title="Insert Code Block"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-clean" aria-label="Remove Styles" title="Remove Styles"></button>
                </span>
            </div>
            <div class="ui-editor-content" [ngStyle]="style" attr.aria-label="Main editor text body"></div>
        </div>
    `,
    providers: [DomHandler,EDITOR_VALUE_ACCESSOR]
})
export class Editor implements AfterViewInit,ControlValueAccessor {
        
    @Output() onTextChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(Header) toolbar;
    
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() placeholder: string;
    
    @Input() formats: string[];
    
    @Output() onInit: EventEmitter<any> = new EventEmitter();
    
    value: string;
    
    _readonly: boolean;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};
    
    quill: any;
    
    constructor(public el: ElementRef, public domHandler: DomHandler) {}

    ngAfterViewInit() {
        let editorElement = this.domHandler.findSingle(this.el.nativeElement ,'div.ui-editor-content'); 
        let toolbarElement = this.domHandler.findSingle(this.el.nativeElement ,'div.ui-editor-toolbar'); 
        
        this.quill = new Quill(editorElement, {
          modules: {
              toolbar: toolbarElement
          },
          placeholder: this.placeholder,
          readOnly: this.readonly,
          theme: 'snow',
          formats: this.formats
        });
                
        if(this.value) {
            this.quill.pasteHTML(this.value);
        }
        
        this.quill.on('text-change', (delta, oldContents, source) => {
            let html = editorElement.children[0].innerHTML;
            let text = this.quill.getText();
            if(html == '<p><br></p>') {
                html = null;
            }

            this.onTextChange.emit({
                htmlValue: html,
                textValue: text,
                delta: delta,
                source: source
            });
            
            this.onModelChange(html);

            if(source === 'user') {
                this.onModelTouched();
            }
        });
        
        this.quill.on('selection-change', (range, oldRange, source) => {
            this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        
        this.onInit.emit({
            editor: this.quill
        });
    }
        
    writeValue(value: any) : void {
        this.value = value;
                
        if(this.quill) {
            if(value)
                this.quill.pasteHTML(value);
            else
                this.quill.setText('');
        }
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    getQuill() {
        return this.quill;
    }
    
    @Input() get readonly(): boolean {
        return this._readonly;
    }

    set readonly(val:boolean) {
        this._readonly = val;
        
        if(this.quill) {
            if(this._readonly)
                this.quill.disable();
            else
                this.quill.enable();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Editor,SharedModule],
    declarations: [Editor]
})
export class EditorModule { }