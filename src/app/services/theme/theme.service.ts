import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {URLParams} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    public rendererFactory: RendererFactory2,
    private _route: ActivatedRoute,
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme(): void {
    setTimeout(() => {
      const queryParams: URLParams = this._route.snapshot.queryParams;
      if(queryParams.darkTheme){
        this._renderer.addClass(this._document.body, 'dark-theme');
      }else {
        this._renderer.addClass(this._document.body, 'light-theme');
      }
    }, 0);

  }
}
