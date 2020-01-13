#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$stageImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-rc"

# Build docker image
docker build -f docker/Dockerfile -t $stageImage .

# Set environment variables
$env:IMAGE = $stageImage

# Set docker machine ip (on windows not localhost)
if ($env:DOCKER_IP -ne $null) {
    $dockerMachineIp = $env:DOCKER_IP
} else {
    $dockerMachineIp = "localhost"
}

try {
    # Workaround to remove dangling images
    docker-compose -f docker/docker-compose.yml down

    docker-compose -f docker/docker-compose.yml up -d
 
    # Test using curl
    Start-Sleep -Seconds 10
    Invoke-WebRequest -Uri "http://$($dockerMachineIp):8080/heartbeat"
    #$postParams = @{ message= @{ device_udi="123"; time=$(Get-Date) } }
    #Invoke-WebRequest -Uri "http://$($dockerMachineIp):8080/v1/rest_gateway/update_status" -Method POST -Body $postParams

    Write-Host "The container was successfully tested."
} finally {
    # Workaround to remove dangling images
    docker-compose -f docker/docker-compose.yml down
}
