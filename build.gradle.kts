plugins {
    id("at.posselt.foundryvtt-module") version "0.0.1-SNAPSHOT"
}

group = "at.posselt"
version = "2.1.2"

foundryvttModule {
    githubUser = "BernhardPosselt"
    githubRepo = "pf2e-kingmaker-map-remake"
    foundryToken = providers.environmentVariable("FOUNDRY_KINGMAKER_MAP_REMAKE_TOKEN")
    githubToken = providers.environmentVariable("GITHUB_TOKEN")
}

tasks.named<Zip>("foundryvttModulePackage") {
    val moduleId: String by extra
    from("assets") { into("$moduleId/assets") }
    from("packs") { into("$moduleId/packs") }
    from("LICENSE") { into("$moduleId/") }
    from("OpenGameLicense.md") { into("$moduleId/") }
    from("README.md") { into("$moduleId/") }
    from("CHANGELOG.md") { into("$moduleId/") }
}