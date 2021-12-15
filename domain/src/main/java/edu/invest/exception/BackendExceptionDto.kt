package edu.invest.exception

import java.time.LocalDateTime

class BackendExceptionDto constructor(
        val timestamp: LocalDateTime,
        val code: CoreExceptionCode,
        val message: String
)