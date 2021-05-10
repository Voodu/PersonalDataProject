import { ScatterSymbolType } from 'victory-core';

export class MarkerStylingPicker {
  public static readonly symbols: ScatterSymbolType[] = [
    'circle',
    'cross',
    'diamond',
    'minus',
    'plus',
    'square',
    'star',
    'triangleDown',
    'triangleUp',
  ];

  public static getColor(id: number | string): string {
    return `rgb(${this.hashCode(String(id)) % 255}, ${
      this.hashCode(String(id + '1')) % 255
    }, ${this.hashCode(String(id + '2')) % 255})`;
  }

  public static getSymbol(id: number | string): ScatterSymbolType {
    if (typeof id === 'string') {
      id = MarkerStylingPicker.hashCode(id);
    }
    return this.symbols[id % this.symbols.length];
  }

  private static hashCode(s: string): number {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      const character = s.charCodeAt(i);
      hash = (hash << 5) - hash + character;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}
