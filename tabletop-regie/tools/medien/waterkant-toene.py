# Erzeugungsskript der Waterkant-Töne (Beleg für die Medienabnahme, Stufe „durch Quellcode geprüft“).
# So wurden die Dateien in media/waterkant/*.mp3 erzeugt: Geräusche synthetisch (numpy),
# Stimmen mit Piper (Stimmen „thorsten“ und „kerstin“, CC0), Lautheit per ffmpeg loudnorm.
# Alarm-Einspielungen (LK04, B5) beginnen mit „Übung, Übung, Übung. Dies ist eine Einspielung
# für den Krisenstab, kein echter Alarm.“ bzw. „Übung.“ und enden mit „Ende der Übungseinspielung.“
# bzw. „Übung.“ – ob das im Raum hörbar und verständlich ist, ist akustisch NICHT abgenommen.
# Voraussetzungen zum erneuten Erzeugen: Python 3 mit numpy, ffmpeg, Piper mit den Stimmmodellen
# unter ./v/ und ./venv/ neben diesem Skript (nicht im Repository). Pfade sind relativ zum Repository.
import numpy as np, subprocess, os, wave
D = os.path.dirname(os.path.abspath(__file__)); O = D + '/out3'; os.makedirs(O, exist_ok=True)
MEDIA = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'media', 'waterkant')
SR = 44100; rng = np.random.default_rng(11)
N = lambda d: int(round(d * SR))
def t(d): return np.arange(N(d)) / SR
def noise(d): return rng.standard_normal(N(d))
def bp(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); X[(f < lo) | (f > hi)] = 0; return np.fft.irfft(X, len(x))
def env_ar(n, a, r):
    e = np.ones(n); A = int(a * SR); R = int(r * SR)
    if A: e[:A] = np.linspace(0, 1, A)
    if R: e[-R:] = np.linspace(1, 0, R)
    return e
def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float64) / 32768
def out(x, name, lufs=-18):
    p = f'{O}/{name}.wav'; x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    w = wave.open(p, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', p, '-af', f'loudnorm=I={lufs}:TP=-1.5:LRA=11', '-ar', '44100', '-ac', '1', '-b:a', '128k', f'{MEDIA}/{name}.mp3'], check=True)
def piper(voice, text, ls=1.05):
    V = {'thorsten': D + '/v/thorsten-low/de-thorsten-low.onnx', 'kerstin': D + '/v/kerstin-low/de-kerstin-low.onnx'}
    p = f'{O}/v-{abs(hash(text)) % 10**8}.wav'
    subprocess.run([D + '/venv/bin/piper', '-m', V[voice], '-f', p, '--length-scale', str(ls), '--sentence-silence', '0.4'], input=text.encode(), check=True, capture_output=True)
    return load(p)
def pad(x, before, total):
    y = np.concatenate([np.zeros(N(before)), x]); return np.concatenate([y, np.zeros(max(0, N(total) - len(y)))])[:N(total)]
def fans(d):  # Serverlüfter: Rauschen + leichte Lüftertöne
    T = t(d); x = bp(noise(d), 120, 6000) * 0.25 + bp(noise(d), 40, 300) * 0.35
    for f, a in [(248, .02), (371, .015), (612, .01), (1180, .006)]:
        x += a * np.sin(2 * np.pi * f * T * (1 + 0.002 * np.sin(2 * np.pi * 0.13 * T)))
    x += 0.04 * np.sin(2 * np.pi * 100 * T)
    return x
PA = lambda v: np.tanh(bp(v, 220, 4200) * 3) * 0.4
# Hintergrund: Rechenzentrum (Schleife 24 s, Übergang glatt)
d = 24.0; x = fans(d); fade = N(1.0); x[:fade] = x[:fade] * np.linspace(0, 1, fade) + x[-fade:] * np.linspace(1, 0, fade); x = x[:-fade]
out(x, 'ambience-rechenzentrum', -22)
# LK03: Klimaalarm-Piepen (läuft über dem Hintergrund)
d = 6.0; T = t(d); x = np.zeros(N(d))
for k in range(5):
    s = N(0.4 + k * 1.1); b = 0.35 * np.sin(2 * np.pi * 2000 * t(0.25)) * env_ar(N(0.25), 0.005, 0.03); x[s:s + len(b)] += b
    s2 = s + N(0.33); x[s2:s2 + len(b)] += b * 0.9
out(x, 'lk03-klimaalarm', -20)
# LK04: Vorwarnung der Löschanlage (gedämpft, kein genormtes Signal), Gasflutung, Durchsage mit "Übung"
horn = np.concatenate([(0.4 * np.sign(np.sin(2 * np.pi * 440 * t(0.5))) * env_ar(N(0.5), 0.01, 0.05)) if i % 2 == 0 else np.zeros(N(0.5)) for i in range(6)])
horn = bp(horn, 200, 1500) * 0.6  # gedämpft durch die Tür
gas = bp(noise(4.0), 300, 9000) * env_ar(N(4.0), 0.3, 1.2) * 0.5
v = PA(piper('kerstin', 'Übung. Achtung, Feueralarm im Verwaltungsgebäude. Bitte verlassen Sie das Gebäude über die gekennzeichneten Fluchtwege und gehen Sie zum Sammelplatz. Übung.', 1.0))
rahmen_a = piper('thorsten', 'Übung, Übung, Übung. Dies ist eine Einspielung für den Krisenstab, kein echter Alarm.', 1.0) * 0.8
rahmen_e = piper('thorsten', 'Ende der Übungseinspielung.', 1.0) * 0.8
pre = fans(1.5) * 0.6
x = np.concatenate([rahmen_a, np.zeros(N(0.6)), pre, horn, gas * 0.8, np.zeros(N(0.4)), v, np.zeros(N(0.6)), rahmen_e])
out(x, 'lk04-loeschanlage-durchsage', -20)
# B5: zweiter Alarm im Lager (gedämpfte Glocke) + Durchsage "Übung"
bell = np.zeros(N(3.0))
for k in range(12):
    s = N(k * 0.25); g = 0.4 * np.sin(2 * np.pi * 950 * t(0.2)) * np.exp(-t(0.2) * 12); bell[s:s + len(g)] += g
bell = bp(bell, 300, 3000) * 0.7
v = PA(piper('thorsten', 'Übung. Achtung, Feueralarm im Zentrallager. Bitte verlassen Sie das Lager über die gekennzeichneten Wege. Übung.', 1.0))
out(np.concatenate([rahmen_a, np.zeros(N(0.6)), bell, np.zeros(N(0.3)), v, np.zeros(N(0.6)), rahmen_e]), 'b5-zweiter-alarm', -20)
# LK22: Kasse startet, Piepton, Bondrucker
x = np.zeros(N(5.0))
boot = 0.15 * bp(noise(1.2), 2000, 7000) * env_ar(N(1.2), 0.05, 0.4); x[N(0.3):N(0.3) + len(boot)] += boot
b = 0.35 * np.sin(2 * np.pi * 1800 * t(0.15)) * env_ar(N(0.15), 0.005, 0.02); x[N(1.8):N(1.8) + len(b)] += b
pr = np.concatenate([bp(noise(0.05), 800, 6000) * 0.5 if i % 2 == 0 else np.zeros(N(0.03)) for i in range(30)]) * 0.5
x[N(2.4):N(2.4) + len(pr)] += pr[:N(5.0) - N(2.4)]
cut = 0.4 * bp(noise(0.08), 500, 5000) * env_ar(N(0.08), 0.002, 0.04); s = N(2.4) + len(pr) + N(0.15); x[s:s + len(cut)] += cut
out(x, 'lk22-kasse-startet', -20)
# LK21: Nachrichtenbeitrag
def env(f, a, k, t0=0, d=2.6):
    T = t(d); return a * np.sin(2 * np.pi * f * (T - t0)) * np.exp(-k * np.clip(T - t0, 0, None)) * (T >= t0)
jingle = sum(env(f, 0.25, 6, t0) for f, t0 in [(523, 0), (659, .14), (784, .28)]) + env(1046, .22, 1.6, .42) + env(523, .15, 1.2, .42)
outro = env(784, .22, 5, 0, 1.6) + env(1046, .22, 1.8, .16, 1.6)
import json
text = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'data', 'scenario.waterkant.json')))['lagekarten'][20]['sprechertext']
text = text.replace('Nordkanal Nachrichten, Donnerstag, dreizehn Uhr.', 'Nordkanal Nachrichten, Donnerstag, dreizehn Uhr.')
v = piper('thorsten', text, 1.06); v = np.tanh(bp(v, 70, 8000) * 1.5) * 0.5
out(np.concatenate([jingle, np.zeros(N(0.4)), v, np.zeros(N(0.6)), outro]), 'lk21-nordkanal-nachrichten', -16)
print('ok')
