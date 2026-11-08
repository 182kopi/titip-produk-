// DATA - TITIPKU
var setting = JSON.parse(localStorage.getItem('titip_setting') || '{"nama":"TITIPKU Retail","alamat":"Pekanbaru","wa":"082366214931","rek":"BRI 107901046166505","minStok":5,"komisiDefault":20}');
var tokoList = JSON.parse(localStorage.getItem('titip_toko') || '[{"id":1,"nama":"Toko Berkah Panam","pemilik":"Ibu Ani","wa":"08123456789","kota":"Panam, Pekanbaru","komisi":20,"status":"Aktif"},{"id":2,"nama":"Toko Sinar Sudirman","pemilik":"Pak Budi","wa":"08234567890","kota":"Sudirman, Pekanbaru","komisi":15,"status":"Aktif"}]');
var produkList = JSON.parse(localStorage.getItem('titip_produk') || '[{"id":1,"nama":"Keripik Singkong Balado","barcode":"899001","kategori":"Snack","modal":8000,"jual":15000,"stokGudang":100},{"id":2,"nama":"Kopi Bubuk 250g","barcode":"899002","kategori":"Minuman","modal":25000,"jual":40000,"stokGudang":50},{"id":3,"nama":"Sambal Ijo Botol","barcode":"899003","kategori":"Makanan","modal":12000,"jual":22000,"stokGudang":80}]');
var titipList = JSON.parse(localStorage.getItem('titip_titip') || '[]');
var stokToko = JSON.parse(localStorage.getItem('titip_stok_toko') || '[]'); // {id, tokoId, produkId, stok, hargaJual}
var jualList = JSON.parse(localStorage.getItem('titip_jual') || '[]');
var returList = JSON.parse(localStorage.getItem('titip_retur') || '[]');
var setoranList = JSON.parse(localStorage.getItem('titip_setoran') || '[]');
var opnameList = JSON.parse(localStorage.getItem('titip_opname') || '[]');
var backupHistory = JSON.parse(localStorage.getItem('titip_backup_history') || '[]');
var keranjang = [];

function saveAll(){
  localStorage.setItem('titip_setting', JSON.stringify(setting));
  localStorage.setItem('titip_toko', JSON.stringify(tokoList));
  localStorage.setItem('titip_produk', JSON.stringify(produkList));
  localStorage.setItem('titip_titip', JSON.stringify(titipList));
  localStorage.setItem('titip_stok_toko', JSON.stringify(stokToko));
  localStorage.setItem('titip_jual', JSON.stringify(jualList));
  localStorage.setItem('titip_retur', JSON.stringify(returList));
  localStorage.setItem('titip_setoran', JSON.stringify(setoranList));
  localStorage.setItem('titip_opname', JSON.stringify(opnameList));
  localStorage.setItem('titip_backup_history', JSON.stringify(backupHistory));
}
function getToko(id){ for(var i=0;i<tokoList.length;i++){ if(tokoList[i].id===id) return tokoList[i]; } return null; }
function getProduk(id){ for(var i=0;i<produkList.length;i++){ if(produkList[i].id===id) return produkList[i]; } return null; }
function getStokToko(tokoId, produkId){ for(var i=0;i<stokToko.length;i++){ if(stokToko[i].tokoId===tokoId && stokToko[i].produkId===produkId) return stokToko[i]; } return null; }
