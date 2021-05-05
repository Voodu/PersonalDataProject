export class ColorPicker {
  public static getColor(id: number | string): string {
    return `rgb(${this.hashCode(String(id)) % 255}, ${
      this.hashCode(String(id + '1')) % 255
    }, ${this.hashCode(String(id + '2')) % 255})`;
  }

  private static hashCode(s: string) {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      const character = s.charCodeAt(i);
      hash = (hash << 5) - hash + character;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}
