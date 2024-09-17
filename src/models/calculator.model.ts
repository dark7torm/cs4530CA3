
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';

export class CalculatorModel implements ICalculatorModel {
  
  private _buffer: string = '';

  public pressNumericKey(key: NumericKeys): void {
    this._buffer += key;
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this._buffer += key;
  }

  public pressActionKey(key: ActionKeys): void {
    if (key === ActionKeys.CLEAR) {
      this._buffer = '';
    } 
    if (key === ActionKeys.DOT) {
      this._buffer += key;
    } 
    if (key === ActionKeys.EQUALS) {
      this._buffer += key;
      const buffer = this._buffer;
      const tokens = buffer.match(/(\d+|\+|\-|\*|\/)/g);
      let result = 0;
      let currentOperator = "+";
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        
        // Check if token is a number
        if (!isNaN(Number(token))) {
            const currentNumber = Number(token);
            
            // Perform the arithmetic based on the last operator encountered
            switch (currentOperator) {
                case '+':
                    result += currentNumber;
                    break;
                case '-':
                    result -= currentNumber;
                    break;
                case '*':
                    result *= currentNumber;
                    break;
                case '/':
                    if (currentNumber === 0) {
                        console.error("Error: Division by zero");
                    } else {
                        result /= currentNumber;
                    }
                    break;
            }
        } else {
            // Update the operator for the next iteration
            currentOperator = token;
        }
    }
      this._buffer += result;

      
    } 
  }

  public display(): string {
    return this._buffer;
  }

}
