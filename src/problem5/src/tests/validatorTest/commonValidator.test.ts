import {
    CommonValidator,
    StringToNumValidator,
    PagedValidator
} from "@/schema/commonSchema";

describe('CommonValidator', () => {
    describe('id', () => {
        it('should validate UUID', () => {
            const validUUID = '2dbb6b06-0430-4244-b0d1-55f2a878e638';
            const invalidUUID = 'invalid-uuid';
            const validParse = CommonValidator.id.safeParse(validUUID);
            const invalidParse = CommonValidator.id.safeParse(invalidUUID);
            expect(validParse.data).toBe(validUUID);
            expect(validParse.success).toBeTruthy();

            expect(invalidParse.data).toBe(undefined);
            expect(invalidParse.success).not.toBeTruthy();
        })
    })

    describe('StringToNumValidator', () => {
        it('should validate numeric string', () => {
            const validString = '123';
            const invalidString = 'abc';

            const validParse = StringToNumValidator().safeParse(validString);
            const invalidParse = StringToNumValidator().safeParse(invalidString);

            expect(validParse.data).toBe(123);
            expect(validParse.success).toBeTruthy();

            expect(invalidParse.data).toBe(undefined);
            expect(invalidParse.success).not.toBeTruthy();
        })
    })

    describe('PagedValidator', () => {
        it('should validate limit and offset', () => {
            [
                PagedValidator.limit,
                PagedValidator.offset,
            ].forEach((validator, vIndex) => {
                const isOffset = vIndex === 1;
                const validDefaultPrase = validator.safeParse(undefined);
                expect(validDefaultPrase.data).toBe(isOffset ? 0 : 10);
                expect(validDefaultPrase.success).toBeTruthy();

                const validInLimitRangePrase = validator.safeParse(50);
                expect(validInLimitRangePrase.data).toBe(50);
                expect(validDefaultPrase.success).toBeTruthy();

                if (!isOffset) {
                    const invalidUpperLimit = validator.safeParse(101);
                    expect(invalidUpperLimit.data).toBe(undefined);
                    expect(invalidUpperLimit.success).not.toBeTruthy();
                }

                const invalidLowerLimit = validator.safeParse(-1);
                expect(invalidLowerLimit.data).toBe(undefined);
                expect(invalidLowerLimit.success).not.toBeTruthy();
            })
        })
    })
})