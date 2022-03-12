[string] $softwarePolicyPath = 'HKLM:\SOFTWARE\Policies'
[string] $googleKey = 'Google'
[string] $googleUpdateKey = 'Update'
[string] $autoUpdateCheckPeriodMinutesValueName =
             'AutoUpdateCheckPeriodMinutes'
[int] $autoUpdateCheckPeriodMinutesValue = 0
# If you are using pre-PowerShell 6.0 use this line of code instead
# [string] $softwarePolicyGoogleUpdatePath =
#     Join-Path `
#         -Path $softwarePolicyPath `
#         -ChildPath $googleKey
[string] $softwarePolicyGooglePath = Join-Path $softwarePolicyPath $googleKey

if (-not (Test-Path $softwarePolicyGooglePath)) {
    Write-Host "Creating: $SoftwarePolicyGooglePath"
    New-Item `
        -Path $softwarePolicyPath `
        -Name $googleKey | Out-Null
}

# If you are using pre-PowerShell 6.0 use this line of code instead
# [string] $softwarePolicyGoogleUpdatePath =
#     Join-Path `
#         -Path $SoftwarePolicyGooglePath `
#         -ChildPath $googleUpdateKey
[string] $softwarePolicyGoogleUpdatePath = Join-Path $softwarePolicyGooglePath $googleUpdateKey

if (-not (Test-Path $softwarePolicyGoogleUpdatePath)) {
    Write-Host "Creating: $softwarePolicyGoogleUpdatePath"
    New-Item `
        -Path $softwarePolicyGooglePath `
        -Name $googleUpdateKey | Out-Null
}

# create or update
Set-ItemProperty `
    -Path $softwarePolicyGoogleUpdatePath `
    -Name $autoUpdateCheckPeriodMinutesValueName `
    -Value $autoUpdateCheckPeriodMinutesValue