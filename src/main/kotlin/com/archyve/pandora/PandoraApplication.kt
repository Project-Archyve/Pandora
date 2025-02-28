package com.archyve.pandora

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PandoraApplication

fun main(args: Array<String>) {
	runApplication<PandoraApplication>(*args)
}
