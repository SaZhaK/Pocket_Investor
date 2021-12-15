package edu.invest.exception

class BackendException constructor(
        val code : CoreExceptionCode
) : RuntimeException() {

}