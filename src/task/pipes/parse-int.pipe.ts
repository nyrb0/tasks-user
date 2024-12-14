import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ParseIntPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const pValue = parseInt(value, 10);
        if (isNaN(pValue))
            throw new Error('Validation faileed: value is not a number');

        return pValue;
    }
}
