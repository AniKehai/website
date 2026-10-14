$basePath = (Get-Location).Path + ".\";

Get-ChildItem -Recurse -File | Where-Object {
    $f =$_.FullName;
    $n =$_.Name;
    $e =$_.Extension;
    $keep =$true;

    # Excluded Directories
    if ($f -like "*\.git\*") { $keep =$false };
    if ($f -like "*\.github\*") { $keep =$false };
    if ($f -like "*\.output\*") { $keep =$false };
    if ($f -like "*\.vscode\*") { $keep =$false };
    if ($f -like "*\.wxt\*") { $keep =$false };
    if ($f -like "*\node_modules\*") { $keep =$false };
    if ($f -like "*\public\*") { $keep =$false };
    if ($f -like "*\.devcontainer\*") { $keep =$false };

    # Excluded Root Files
    if ($n -eq ".gitignore") { $keep =$false };
    if ($n -eq "biome.json") { $keep =$false };
    if ($n -eq "bun.lock") { $keep =$false };
    if ($n -eq "LICENSE") { $keep =$false };
    if ($n -eq "project-snapshot.md") { $keep =$false };
    if ($n -eq "README.md") { $keep =$false };
    if ($n -eq "snapshot.ps1") { $keep =$false };

    # Excluded Extensions
    if ($e -eq ".png") { $keep =$false };
    if ($e -eq ".ico") { $keep =$false };
    if ($e -eq ".jpg") { $keep =$false };
    if ($e -eq ".jpeg") { $keep =$false };
    if ($e -eq ".svg") { $keep =$false };
    if ($e -eq ".gif") { $keep =$false };
    if ($e -eq ".woff") { $keep =$false };
    if ($e -eq ".woff2") { $keep =$false };
    if ($e -eq ".ttf") { $keep =$false };
    if ($e -eq ".eot") { $keep =$false };
    if ($e -eq ".mp4") { $keep =$false };
    if ($e -eq ".webm") { $keep =$false };

    $keep;
} | ForEach-Object {
    $relPath = $_.FullName.Replace($basePath, "").Replace("\", "/");

    $content = Get-Content -LiteralPath:$_.FullName -Raw;

    "### $relPath`r`n``````text`r`n$content`r`n```````r`n";
} | Out-File -FilePath:"project-snapshot.md" -Encoding:utf8;

Write-Host "Snapshot generated successfully!" -ForegroundColor:Green;
