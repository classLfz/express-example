workflow "Build on push" {
  on = "push"
  resolves = ["TEST"]
}

action "INSTALL" {
  uses = "docker://node:10:14"
  runs = "npm install"
}

action "INSTALL-GLOGAL" {
  needs = "INSTALL"
  uses = "docker://node:10.14"
  runs = "npm install --global gulp"
}

action "LINT" {
  needs = "INSTALL-GLOBAL"
  uses = "docker://node:10.14"
  runs = "npm run lint"
}

action "TEST" {
  needs = "LINT"
  uses = "docker://node:10.14"
  runs = "npm run test"
}
