import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConvert',
})
export class CurrencyConvertPipe implements PipeTransform {
  private exchangeRates = {
    USD: 1,
    EUR: 0.85, 
    GBP: 0.75, 
  };

  transform(value: number, currency: 'USD' | 'EUR' | 'GBP' = 'USD'): string {
    if (!value && value !== 0) return '';

    const rate = this.exchangeRates[currency] || 1;

    const convertedValue = value * rate;

    const currencyMap: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
    };

    const symbol = currencyMap[currency] || '$';

    return `${symbol}${convertedValue.toFixed(2)}`;
  }
}
