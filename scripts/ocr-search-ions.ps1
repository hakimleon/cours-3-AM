# OCR automatique des pages PNG d'un PDF (Windows.Media.Ocr, moteur ar-SA)
# puis recherche des termes interdits (ions) dans le texte reconnu.
# Usage : powershell -ExecutionPolicy Bypass -File scripts/ocr-search-ions.ps1 -PagesDir pdf_render_new/ocr-pages -OutFile pdf_render_new/ocr-text.txt
param(
  [Parameter(Mandatory = $true)][string]$PagesDir,
  [Parameter(Mandatory = $true)][string]$OutFile
)

Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
  })[0]
function Await($WinRtTask, $ResultType) {
  $asTask = $asTaskGeneric.MakeGenericMethod($ResultType)
  $netTask = $asTask.Invoke($null, @($WinRtTask))
  $netTask.Wait(-1) | Out-Null
  $netTask.Result
}

[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.IRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.SoftwareBitmap, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrResult, Windows.Media.Ocr, ContentType = WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime] | Out-Null

$lang = New-Object Windows.Globalization.Language 'ar-SA'
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
if (-not $engine) { throw "Moteur OCR arabe indisponible" }

$all = New-Object System.Text.StringBuilder
Get-ChildItem $PagesDir -Filter '*.png' | Sort-Object Name | ForEach-Object {
  $path = $_.FullName
  $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($path)) ([Windows.Storage.StorageFile])
  $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
  $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
  $result = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
  [void]$all.AppendLine("===== $($_.Name) =====")
  [void]$all.AppendLine($result.Text)
  $stream.Dispose()
  Write-Host "OCR OK: $($_.Name) ($($result.Text.Length) chars)"
}

$text = $all.ToString()
[System.IO.File]::WriteAllText($OutFile, $text, [System.Text.Encoding]::UTF8)
Write-Host "Texte OCR enregistre dans $OutFile ($($text.Length) chars)"
Write-Host "La recherche des termes d'ions se fait ensuite avec : python scripts/search-pdf-ions.py <pdf> <dom.txt> $OutFile"
