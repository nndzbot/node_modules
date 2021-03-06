/**
 * @preserve
 * Copyright 2015-2016 Igor Bezkrovnyi
 * All rights reserved. (MIT Licensed)
 *
 * hueStatistics.ts - part of Image Quantization Library
 */
import { rgb2hsl } from "../conversion/rgb2hsl"
import { hueGroup } from "./palette"

class HueGroup {
    num : number    = 0;
    cols : number[] = [];
}

export class HueStatistics {
    private _numGroups : number;
    private _minCols : number;
    private _stats : HueGroup[];
    private _groupsFull : number;

    constructor(numGroups : number, minCols : number) {
        this._numGroups = numGroups;
        this._minCols   = minCols;
        this._stats     = [];

        for (let i = 0; i <= numGroups; i++) {
            this._stats[ i ] = new HueGroup();
        }

        this._groupsFull = 0;
    }

    check(i32 : number) {
        if (this._groupsFull == this._numGroups + 1) {
            this.check = function () {
            };
        }

        const r   = (i32 & 0xff),
              g   = (i32 >>> 8) & 0xff,
              b   = (i32 >>> 16) & 0xff,
              hg  = (r == g && g == b) ? 0 : 1 + hueGroup(rgb2hsl(r, g, b).h, this._numGroups),
              gr  = this._stats[ hg ],
              min = this._minCols;

        gr.num++;

        if (gr.num > min)
            return;
        if (gr.num == min)
            this._groupsFull++;

        if (gr.num <= min)
            this._stats[ hg ].cols.push(i32);
    }

    injectIntoDictionary(histG : { [key : string ] : number}) {
        for (let i = 0; i <= this._numGroups; i++) {
            if (this._stats[ i ].num <= this._minCols) {
                this._stats[ i ].cols.forEach((col : number) => {
                    if (!histG[ col ])
                        histG[ col ] = 1;
                    else
                        histG[ col ]++;
                });
            }
        }
    }

    injectIntoArray(histG : string[]) {
        for (let i = 0; i <= this._numGroups; i++) {
            if (this._stats[ i ].num <= this._minCols) {
                this._stats[ i ].cols.forEach((col : any) => {
                    if (histG.indexOf(col) == -1)
                        histG.push(col);
                });
            }
        }
    }
}
