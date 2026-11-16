const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir menu');
}));

const photos = [
  ['02_lateral', 'Lateral', 'visto de lado'],
  ['01_hero_frontal_3-4', 'Frontal', 'visto de frente'],
  ['03_traseira_3-4', 'Traseira', 'visto por trás'],
  ['04_interior', 'Interior', 'interior'],
  ['05_detalhe_farol', 'Farol', 'detalhe do farol'],
  ['06_detalhe_roda', 'Roda', 'detalhe da roda'],
  ['07_em_movimento', 'Em movimento', 'em movimento']
];
const models = {
  S9: { type: 'SEDÃ CONCEITUAL', description: 'Linhas fluidas, presença marcante e uma experiência pensada para transformar cada chegada.', trait: 'Elegância' },
  X7: { type: 'SUV CONCEITUAL', description: 'Uma presença imponente para explorar novos caminhos, com espaço para tudo o que move você.', trait: 'Versatilidade' }
};
let currentModel = 'S9';
let currentPhoto = 0;
function showPhoto() {
  const [file, label, description] = photos[currentPhoto];
  const image = document.querySelector('#modelImage');
  image.src = `assets/VELORA_${currentModel}_${file}.webp`;
  image.alt = `VELORA ${currentModel}: ${description}`;
  document.querySelector('#photoLabel').textContent = `${label.toUpperCase()} · ${String(currentPhoto + 1).padStart(2, '0')} / 07`;
}
document.querySelector('#prevPhoto').addEventListener('click', () => {
  currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
  showPhoto();
});
document.querySelector('#nextPhoto').addEventListener('click', () => {
  currentPhoto = (currentPhoto + 1) % photos.length;
  showPhoto();
});
document.querySelectorAll('.model-tab').forEach(tab => tab.addEventListener('click', () => {
  currentModel = tab.dataset.model;
  currentPhoto = 0;
  const model = models[currentModel];
  document.querySelectorAll('.model-tab').forEach(item => {
    item.classList.toggle('active', item === tab);
    item.setAttribute('aria-selected', String(item === tab));
  });
  document.querySelector('#modelName').textContent = currentModel;
  document.querySelector('#modelType').textContent = model.type;
  document.querySelector('#modelDescription').textContent = model.description;
  document.querySelector('#modelTrait').textContent = model.trait;
  showPhoto();
}));
