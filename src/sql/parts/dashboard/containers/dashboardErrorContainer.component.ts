/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import 'vs/css!./dashboardErrorContainer';

import { Component, Inject, Input, forwardRef, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { TabConfig } from 'sql/parts/dashboard/common/dashboardWidget';
import { DashboardTab } from 'sql/parts/dashboard/common/interfaces';

import Event, { Emitter } from 'vs/base/common/event';
import * as nls from 'vs/nls';

@Component({
	selector: 'dashboard-error-container',
	providers: [{ provide: DashboardTab, useExisting: forwardRef(() => DashboardErrorContainer) }],
	template: `
		<div class="error-container">
			<div class="icon globalError">
			</div>
			<div class="error-message" #errorMessage>
			</div>
		</div>
	`
})
export class DashboardErrorContainer extends DashboardTab implements AfterViewInit {
	@Input() private tab: TabConfig;
	private _onResize = new Emitter<void>();
	public readonly onResize: Event<void> = this._onResize.event;

	@ViewChild('errorMessage', { read: ElementRef }) private _errorMessageContainer: ElementRef;
	constructor(
		@Inject(forwardRef(() => ChangeDetectorRef)) protected _cd: ChangeDetectorRef
	) {
		super();
	}

	ngAfterViewInit() {
		let errorMessage = this._errorMessageContainer.nativeElement as HTMLElement;
		errorMessage.innerHTML = nls.localize('dashboardNavSection_loadTabError', 'The {0} has an invalid content. Please contact extension owner.', this.tab.title);
	}

	public get id(): string {
		return this.tab.id;
	}

	public get editable(): boolean {
		return false;
	}

	public layout() {
	}

	public refresh(): void {
	}
}
