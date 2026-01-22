import { NextResponse } from 'next/server';

type ApiResponseData = {
    success: boolean;
    message?: string;
    data?: any;
    error?: any;
};

/**
 * Standardized Success Response
 */
export function successResponse(data: any, message: string = 'Success', status: number = 200) {
    return NextResponse.json(
        {
            success: true,
            message,
            data,
        },
        { status }
    );
}

/**
 * Standardized Error Response
 */
export function errorResponse(message: string, status: number = 500, error: any = null) {
    return NextResponse.json(
        {
            success: false,
            message,
            error: error instanceof Error ? error.message : error,
        },
        { status }
    );
}
