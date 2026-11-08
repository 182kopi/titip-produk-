function renderJual(){
  var html='';
  for(var i=0;i<jualList.length;i++){ var j=jualList[i]; var t=getToko(j.tokoId); var p=getProduk(j.produkId); html+='<tr><td>'+j.tgl+'</td><td>'+(t?t.nama:'')+'</td><td>'+(p?p.nama:'')+'</td><td>'+j.qty+'</td><td>'+fmt(j.total)+'</td><td>'+fmt(j.labaBersih||0)+'</td><td><button class="btn btn-red btn-sm" onclick="delJual('+j.id+')">Hapus</button></td></tr>'; }
  document.getElementById('table-jual').innerHTML=html||'<tr><td colspan="7" style="text-align:center">Belum ada penjualan</td></tr>';
  var optToko=''; for(var k=0;k<tokoList.length;k++) optToko+='<option value="'+tokoList[k].id+'">'+tokoList[k].nama+'</option>';
  document.getElementById('jual-toko').innerHTML=optToko; document.getElementById('retur-toko').innerHTML=optToko; document.getElementById('setoran-toko').innerHTML=optToko;
  loadReturProduk(); renderJualProduk();
}
function renderRetur(){
  var html='';
  for(var i=0;i<returList.length;i++){ var r=returList[i]; var t=getToko(r.tokoId); var p=getProduk(r.produkId); html+='<tr><td>'+r.tgl+'</td><td>'+(t?t.nama:'')+'</td><td>'+(p?p.nama:'')+'</td><td>'+r.jumlah+'</td><td>'+r.alasan+'</td><td><button class="btn btn-red btn-sm" onclick="delRetur('+r.id+')">Hapus</button></td></tr>'; }
  document.getElementById('table-retur').innerHTML=html||'<tr><td colspan="6" style="text-align:center">Belum ada retur</td></tr>';
}
function renderSetoran(){
  var html='';
  for(var i=0;i<setoranList.length;i++){ var s=setoranList[i]; var t=getToko(s.tokoId); html+='<tr><td>'+s.tgl+'</td><td>'+(t?t.nama:'')+'</td><td>'+fmt(s.jumlah)+'</td><td>'+s.metode+'</td><td><button class="btn btn-red btn-sm" onclick="delSetoran('+s.id+')">Hapus</button></td></tr>'; }
  document.getElementById('table-setoran').innerHTML=html||'<tr><td colspan="5" style="text-align:center">Belum ada setoran</td></tr>';
  var piutangHtml='';
  for(var j=0;j<tokoList.length;j++){
    var toko=tokoList[j]; var omzet=0; var komisiTotal=0; for(var k=0;k<jualList.length;k++){ if(jualList[k].tokoId===toko.id){ omzet+=jualList[k].total||0; komisiTotal+=jualList[k].komisi||0; } }
    var setor=0; for(var s2=0;s2<setoranList.length;s2++){ if(setoranList[s2].tokoId===toko.id) setor+=setoranList[s2].jumlah; }
    var piutang=omzet-komisiTotal-setor;
    piutangHtml+='<div style="display:flex;justify-content:space-between;border-bottom:1px solid #eee;padding:8px 0;font-size:12px"><span><b>'+toko.nama+'</b> • Omzet '+fmt(omzet)+' - Komisi '+fmt(komisiTotal)+' - Setoran '+fmt(setor)+'</span><span><b>Piutang '+fmt(piutang)+'</b></span></div>';
  }
  document.getElementById('list-piutang').innerHTML=piutangHtml;
}
function renderDashboard(){
  var omzet=0; var modal=0; var komisi=0;
  for(var i=0;i<jualList.length;i++){
    var j=jualList[i];
    var p=getProduk(j.produkId);
    var t=getToko(j.tokoId);
    omzet += j.total || 0;
    modal += p ? (j.qty || 0) * p.modal : (j.modal || 0);
    komisi += t ? Math.round((j.total || 0) * (t.komisi || 0) / 100) : 0;
  }
  var laba=omzet-modal-komisi;
  var setorTotal=0; for(var s=0;s<setoranList.length;s++) setorTotal+=setoranList[s].jumlah || 0;
  var piutang=omzet-komisi-setorTotal;
  document.getElementById('dash-omzet').innerText=fmt(omzet);
  document.getElementById('dash-omzet-sub').innerText=jualList.length+' transaksi';
  document.getElementById('dash-laba').innerText=fmt(laba);
  document.getElementById('dash-piutang').innerText=fmt(piutang);
  var totalStok=0; for(var p2=0;p2<produkList.length;p2++) totalStok+=produkList[p2].stokGudang || 0;
  for(var q=0;q<stokToko.length;q++) totalStok+=stokToko[q].stok || 0;
  document.getElementById('dash-stok').innerText=totalStok;
  document.getElementById('dash-stok-sub').innerText=tokoList.length+' toko • '+produkList.length+' produk';
  var perToko={}; for(var j2=0;j2<jualList.length;j2++){ perToko[jualList[j2].tokoId]=(perToko[jualList[j2].tokoId]||0)+jualList[j2].total; }
  var topTokoHtml=''; for(var key in perToko){ var t2=getToko(parseInt(key)); topTokoHtml+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 0;border-bottom:1px solid #eee"><span>'+(t2?t2.nama:'')+'</span><span><b>'+fmt(perToko[key])+'</b></span></div>'; }
  document.getElementById('top-toko').innerHTML=topTokoHtml||'Belum ada penjualan';
  var perProduk={}; for(var k=0;k<jualList.length;k++){ perProduk[jualList[k].produkId]=(perProduk[jualList[k].produkId]||0)+jualList[k].qty; }
  var topProdukHtml=''; for(var key2 in perProduk){ var pp=getProduk(parseInt(key2)); topProdukHtml+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 0;border-bottom:1px solid #eee"><span>'+(pp?pp.nama:'')+'</span><span><b>'+perProduk[key2]+' pcs</b></span></div>'; }
  document.getElementById('top-produk').innerHTML=topProdukHtml||'Belum ada penjualan';
  var alertHtml=''; for(var a=0;a<produkList.length;a++){ if(produkList[a].stokGudang<=setting.minStok) alertHtml+='<div style="background:#fefce8;padding:8px;border-radius:8px;margin-bottom:6px">⚠️ '+produkList[a].nama+' sisa '+produkList[a].stokGudang+'</div>'; }
  document.getElementById('alert-stok').innerHTML=alertHtml||'Stok aman ✅';
  var today=todayStr(); var titipHari=''; for(var t3=0;t3<titipList.length;t3++){ if(titipList[t3].tgl===today){ var tt=getToko(titipList[t3].tokoId); var pr=getProduk(titipList[t3].produkId); titipHari+='<div>'+titipList[t3].jumlah+'x '+(pr?pr.nama:'')+' → '+(tt?tt.nama:'')+'</div>'; } }
  document.getElementById('titip-hari-ini').innerHTML=titipHari||'Tidak ada titip hari ini';
  document.getElementById('alert-piutang').innerHTML='Piutang total: '+fmt(piutang);
}
function renderLaporan(){
  var omzet=0; var modal=0; var komisi=0;
  for(var i=0;i<jualList.length;i++){
    var j=jualList[i];
    var p=getProduk(j.produkId);
    var t=getToko(j.tokoId);
    var totalJual=j.total || 0;
    var modalJual=p ? (j.qty||0)*p.modal : (j.modal||0);
    var komisiJual=t ? Math.round(totalJual*(t.komisi||0)/100) : 0;
    omzet+=totalJual; modal+=modalJual; komisi+=komisiJual;
    j.modal=modalJual; j.komisi=komisiJual; j.labaBersih=totalJual-modalJual-komisiJual;
  }
  document.getElementById('l-omzet').innerText=fmt(omzet);
  document.getElementById('l-modal').innerText=fmt(modal);
  document.getElementById('l-komisi').innerText=fmt(komisi);
  document.getElementById('l-laba').innerText=fmt(omzet-modal-komisi);
  var perToko={}; for(var j2=0;j2<jualList.length;j2++){ perToko[jualList[j2].tokoId]=(perToko[jualList[j2].tokoId]||0)+jualList[j2].total; }
  var htmlToko=''; for(var key in perToko){ var t2=getToko(parseInt(key)); htmlToko+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0;border-bottom:1px solid #eee"><span>'+(t2?t2.nama:'')+'</span><span>'+fmt(perToko[key])+'</span></div>'; }
  document.getElementById('laporan-toko').innerHTML=htmlToko||'Belum ada';
  var perProduk={}; for(var k=0;k<jualList.length;k++){ perProduk[jualList[k].produkId]=(perProduk[jualList[k].produkId]||0)+jualList[k].total; }
  var htmlProduk=''; for(var key2 in perProduk){ var p2=getProduk(parseInt(key2)); htmlProduk+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0;border-bottom:1px solid #eee"><span>'+(p2?p2.nama:'')+'</span><span>'+fmt(perProduk[key2])+'</span></div>'; }
  document.getElementById('laporan-produk').innerHTML=htmlProduk||'Belum ada';
}
function renderBackup(){
  var el=document.getElementById('backup-info'); if(el) el.innerHTML='Toko: <b>'+tokoList.length+'</b> | Produk: <b>'+produkList.length+'</b> | Titip: <b>'+titipList.length+'</b> | Jual: <b>'+jualList.length+'</b>';
  var hist=document.getElementById('backup-history'); if(hist) hist.innerHTML=backupHistory.slice(0,5).map(function(h){ return '<div>'+h.tgl+' - '+h.size+'</div>'; }).join('')||'Belum ada backup';
}
function renderPengaturan(){
  document.getElementById('set-nama').value=setting.nama; document.getElementById('set-alamat').value=setting.alamat; document.getElementById('set-wa').value=setting.wa; document.getElementById('set-rek').value=setting.rek; document.getElementById('set-min-stok').value=setting.minStok; document.getElementById('set-komisi').value=setting.komisiDefault;
}
function renderAll(){ renderDashboard(); renderToko(); renderProduk(); renderTitip(); renderStok(); renderJual(); renderRetur(); renderSetoran(); renderLaporan(); renderBackup(); renderPengaturan(); }
function toggleSidebar(){
  var sb=document.querySelector('.sidebar'); if(!sb) return;
  sb.classList.toggle('open');
  var overlay=document.getElementById('sidebar-overlay');
  if(!overlay){ overlay=document.createElement('div'); overlay.id='sidebar-overlay'; overlay.className='sidebar-overlay'; overlay.onclick=toggleSidebar; document.body.appendChild(overlay); }
  overlay.classList.toggle('show', sb.classList.contains('open'));
}
function init(){
  var t1=document.getElementById('titip-tgl'); if(t1) t1.valueAsDate=new Date();
  var t2=document.getElementById('jual-tgl'); if(t2) t2.valueAsDate=new Date();
  var t3=document.getElementById('retur-tgl'); if(t3) t3.valueAsDate=new Date();
  var t4=document.getElementById('setoran-tgl'); if(t4) t4.valueAsDate=new Date();
  renderAll();
}
init();
