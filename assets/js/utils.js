// UTILS
function fmt(n){ return 'Rp ' + (n||0).toLocaleString('id-ID'); }
function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }
function todayStr(){ return new Date().toISOString().split('T')[0]; }
function getAllData(){ return {version:'TITIPKU v1', exportedAt:new Date().toISOString(), setting:setting, tokoList:tokoList, produkList:produkList, titipList:titipList, stokToko:stokToko, jualList:jualList, returList:returList, setoranList:setoranList, opnameList:opnameList}; }
function backupNow(){
  var json = JSON.stringify(getAllData(), null, 2);
  var blob = new Blob([json], {type:'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a'); a.href=url; a.download='TITIPKU-Backup-'+todayStr()+'.json'; a.click();
  URL.revokeObjectURL(url);
  backupHistory.unshift({tgl:new Date().toLocaleString('id-ID'), size:(json.length/1024).toFixed(1)+' KB'});
  localStorage.setItem('titip_backup_history', JSON.stringify(backupHistory));
  localStorage.setItem('titip_last_backup', new Date().toLocaleString('id-ID'));
  renderBackup(); alert('Backup berhasil! Upload ke Google Drive agar aman.');
}
function backupToDrive(){ backupNow(); setTimeout(function(){ if(confirm('Buka Google Drive?')) window.open('https://drive.google.com/drive/my-drive','_blank'); }, 500); }
function restoreFromFile(e){
  var file = e.target.files[0]; if(!file) return;
  var r = new FileReader();
  r.onload = function(ev){
    try{
      var d = JSON.parse(ev.target.result);
      if(!d.tokoList || !d.produkList){ alert('File tidak valid!'); return; }
      if(!confirm('Restore backup dari '+d.exportedAt+' ?')) return;
      setting=d.setting||setting; tokoList=d.tokoList; produkList=d.produkList; titipList=d.titipList||[]; stokToko=d.stokToko||[]; jualList=d.jualList||[]; returList=d.returList||[]; setoranList=d.setoranList||[]; opnameList=d.opnameList||[];
      saveAll(); renderAll(); alert('Restore berhasil!');
    }catch(err){ alert('File rusak!'); }
  };
  r.readAsText(file);
}
function exportCSV(){
  var csv='Tanggal,Toko,Produk,Qty,Total,Laba,Komisi\n';
  for(var i=0;i<jualList.length;i++){ var j=jualList[i]; var t=getToko(j.tokoId); var p=getProduk(j.produkId); csv += j.tgl+','+(t?t.nama:'')+','+(p?p.nama:'')+','+j.qty+','+j.total+','+j.laba+','+j.komisi+'\n'; }
  var blob=new Blob([csv],{type:'text/csv'}); var url=URL.createObjectURL(blob); var a=document.createElement('a'); a.href=url; a.download='Laporan-TITIPKU.csv'; a.click();
}
function logout(){ if(confirm('Keluar?')) location.reload(); }
