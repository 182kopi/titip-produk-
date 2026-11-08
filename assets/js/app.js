// APP.JS - TITIPKU VERSI BERSIH - SUDAH DIPERBAIKI
function showPage(page){
  var all=document.querySelectorAll('.page');
  for(var i=0;i<all.length;i++) all[i].classList.remove('active');
  var el=document.getElementById('page-'+page);
  if(el) el.classList.add('active');
  var navs=document.querySelectorAll('#main-nav button');
  for(var j=0;j<navs.length;j++) navs[j].classList.remove('active');
  var nav=document.querySelector('#main-nav button[data-page="'+page+'"]');
  if(nav) nav.classList.add('active');
  var bnavs=document.querySelectorAll('.bottom-nav button');
  for(var k=0;k<bnavs.length;k++) bnavs[k].classList.remove('active');
  var bnav=document.querySelector('.bottom-nav button[data-page="'+page+'"]');
  if(bnav) bnav.classList.add('active');
  var titles={dashboard:'Dashboard',toko:'Data Toko',produk:'Data Produk',titip:'Titip Produk',stok:'Stok & Opname',jual:'Penjualan / Kasir',retur:'Retur',setoran:'Setoran & Piutang',laporan:'Laporan',backup:'Backup',pengaturan:'Pengaturan'};
  var titleEl=document.getElementById('page-title');
  if(titleEl) titleEl.innerText=titles[page]||page;
  window.scrollTo(0,0);
  renderAll();
}
if(document.querySelectorAll('#main-nav button').length>0){
  document.querySelectorAll('#main-nav button').forEach(function(b){
    b.addEventListener('click', function(){ showPage(b.dataset.page); });
  });
}
function openModal(id){ var m=document.getElementById(id); if(m) m.classList.add('open'); }
function closeModal(id){ var m=document.getElementById(id); if(m) m.classList.remove('open'); }
function openModalTokoBaru(){
  document.getElementById('toko-edit-id').value='';
  document.getElementById('toko-nama').value='';
  document.getElementById('toko-pemilik').value='';
  document.getElementById('toko-wa').value='';
  document.getElementById('toko-kota').value='';
  document.getElementById('toko-komisi').value=setting.komisiDefault;
  document.getElementById('modal-toko-title').innerText='Tambah Toko';
  openModal('modal-toko');
}
function saveToko(){
  var editId=document.getElementById('toko-edit-id').value;
  var nama=document.getElementById('toko-nama').value;
  if(!nama){ alert('Nama toko wajib!'); return; }
  var data={nama:nama, pemilik:document.getElementById('toko-pemilik').value, wa:document.getElementById('toko-wa').value, kota:document.getElementById('toko-kota').value, komisi:parseInt(document.getElementById('toko-komisi').value)||20, status:document.getElementById('toko-status').value};
  if(editId){
    for(var i=0;i<tokoList.length;i++){ if(tokoList[i].id===parseInt(editId)){ tokoList[i].nama=data.nama; tokoList[i].pemilik=data.pemilik; tokoList[i].wa=data.wa; tokoList[i].kota=data.kota; tokoList[i].komisi=data.komisi; tokoList[i].status=data.status; } }
    alert('Toko berhasil di-EDIT!');
  } else { data.id=Date.now(); tokoList.push(data); alert('Toko baru tersimpan!'); }
  saveAll(); closeModal('modal-toko'); renderAll();
}
function editToko(id){ var t=getToko(id); if(!t) return; document.getElementById('toko-edit-id').value=t.id; document.getElementById('toko-nama').value=t.nama; document.getElementById('toko-pemilik').value=t.pemilik||''; document.getElementById('toko-wa').value=t.wa||''; document.getElementById('toko-kota').value=t.kota||''; document.getElementById('toko-komisi').value=t.komisi; document.getElementById('toko-status').value=t.status; document.getElementById('modal-toko-title').innerText='Edit Toko - '+t.nama; openModal('modal-toko'); }
function delToko(id){ if(!confirm('Hapus toko ini?')) return; tokoList=tokoList.filter(function(x){ return x.id!==id; }); stokToko=stokToko.filter(function(x){ return x.tokoId!==id; }); saveAll(); renderAll(); }
function openModalProdukBaru(){ document.getElementById('produk-edit-id').value=''; document.getElementById('produk-nama').value=''; document.getElementById('produk-barcode').value=''; document.getElementById('produk-modal').value=''; document.getElementById('produk-jual').value=''; document.getElementById('produk-stok').value=''; document.getElementById('modal-produk-title').innerText='Tambah Produk'; openModal('modal-produk'); }
function saveProduk(){
  var editId=document.getElementById('produk-edit-id').value;
  var nama=document.getElementById('produk-nama').value; if(!nama){ alert('Nama produk wajib!'); return; }
  var modal=parseInt(document.getElementById('produk-modal').value)||0; var jual=parseInt(document.getElementById('produk-jual').value)||0;
  if(editId){
    for(var i=0;i<produkList.length;i++){ if(produkList[i].id===parseInt(editId)){ produkList[i].nama=nama; produkList[i].barcode=document.getElementById('produk-barcode').value; produkList[i].kategori=document.getElementById('produk-kategori').value; produkList[i].modal=modal; produkList[i].jual=jual; } }
    alert('Produk berhasil di-EDIT!');
  } else { produkList.push({id:Date.now(), nama:nama, barcode:document.getElementById('produk-barcode').value, kategori:document.getElementById('produk-kategori').value, modal:modal, jual:jual, stokGudang:parseInt(document.getElementById('produk-stok').value)||0}); alert('Produk baru tersimpan!'); }
  saveAll(); closeModal('modal-produk'); renderAll();
}
function editProduk(id){ var p=getProduk(id); if(!p) return; document.getElementById('produk-edit-id').value=p.id; document.getElementById('produk-nama').value=p.nama; document.getElementById('produk-barcode').value=p.barcode||''; document.getElementById('produk-kategori').value=p.kategori; document.getElementById('produk-modal').value=p.modal; document.getElementById('produk-jual').value=p.jual; document.getElementById('produk-stok').value=p.stokGudang; document.getElementById('modal-produk-title').innerText='Edit Produk - '+p.nama; openModal('modal-produk'); }
function delProduk(id){ if(!confirm('Hapus produk ini?')) return; produkList=produkList.filter(function(x){ return x.id!==id; }); stokToko=stokToko.filter(function(x){ return x.produkId!==id; }); saveAll(); renderAll(); }
function tambahStokGudang(id){ var jml=parseInt(prompt('Tambah stok gudang berapa?','10')); if(!jml) return; var p=getProduk(id); p.stokGudang+=jml; saveAll(); renderAll(); }
function updateTitipInfo(){
  var tokoId=parseInt(document.getElementById('titip-toko').value); var produkId=parseInt(document.getElementById('titip-produk').value); var jml=parseInt(document.getElementById('titip-jumlah').value)||0;
  var p=getProduk(produkId); var t=getToko(tokoId); if(!p||!t) return;
  document.getElementById('titip-info').innerHTML='Produk: <b>'+p.nama+'</b> | Stok Gudang: <b>'+p.stokGudang+'</b> | Mau titip: <b>'+jml+'</b> | Sisa: <b>'+(p.stokGudang-jml)+'</b>';
}
function saveTitip(){
  var tokoId=parseInt(document.getElementById('titip-toko').value); var produkId=parseInt(document.getElementById('titip-produk').value); var jml=parseInt(document.getElementById('titip-jumlah').value)||0;
  var tgl=document.getElementById('titip-tgl').value||todayStr();
  if(!jml){ alert('Jumlah wajib!'); return; }
  var p=getProduk(produkId); if(jml>p.stokGudang){ alert('Stok gudang tidak cukup! Sisa '+p.stokGudang); return; }
  var hargaJual=parseInt(document.getElementById('titip-harga-jual').value)||p.jual;
  p.stokGudang-=jml;
  var existing=getStokToko(tokoId, produkId);
  if(existing){ existing.stok+=jml; existing.hargaJual=hargaJual; } else { stokToko.push({id:Date.now(), tokoId:tokoId, produkId:produkId, stok:jml, hargaJual:hargaJual}); }
  titipList.unshift({id:Date.now(), tokoId:tokoId, produkId:produkId, jumlah:jml, tgl:tgl, hargaJual:hargaJual, catatan:document.getElementById('titip-catatan').value, status:'Aktif'});
  saveAll(); renderAll(); alert('Titip berhasil!');
}
function delTitip(id){ if(!confirm('Hapus riwayat titip ini?')) return; titipList=titipList.filter(function(x){ return x.id!==id; }); saveAll(); renderAll(); }
function saveOpname(){
  var produkId=parseInt(document.getElementById('opname-produk').value); var fisik=parseInt(document.getElementById('opname-jumlah').value);
  if(isNaN(fisik)){ alert('Isi stok fisik!'); return; }
  var p=getProduk(produkId); var selisih=fisik-p.stokGudang;
  opnameList.unshift({id:Date.now(), produkId:produkId, stokLama:p.stokGudang, stokBaru:fisik, selisih:selisih, tgl:todayStr(), ket:document.getElementById('opname-ket').value});
  p.stokGudang=fisik; saveAll(); renderAll(); alert('Opname tersimpan!');
}
function renderJualProduk(){
  var tokoId=parseInt(document.getElementById('jual-toko').value); var q=(document.getElementById('jual-search').value||'').toLowerCase();
  var html='';
  for(var i=0;i<stokToko.length;i++){
    var s=stokToko[i]; if(s.tokoId!==tokoId) continue; if(s.stok<=0) continue;
    var p=getProduk(s.produkId); if(!p) continue; if(q && p.nama.toLowerCase().indexOf(q)===-1) continue;
    html+='<div class="card"><b>'+p.nama+'</b><p class="small muted">Stok: '+s.stok+' • '+fmt(s.hargaJual)+'</p><div class="flex mt"><input type="number" id="qty-'+s.id+'" value="1" min="1" max="'+s.stok+'" style="width:80px"><button class="btn btn-blue btn-sm" onclick="tambahKeranjang('+s.id+')">+ Keranjang</button></div></div>';
  }
  document.getElementById('list-jual-produk').innerHTML=html||'<p class="small muted">Tidak ada stok di toko ini. Titip dulu di menu Titip.</p>';
  renderKeranjang();
}
function tambahKeranjang(stokId){
  var qty=parseInt(document.getElementById('qty-'+stokId).value)||1;
  var s=null; for(var i=0;i<stokToko.length;i++){ if(stokToko[i].id===stokId) s=stokToko[i]; }
  if(!s) return; if(qty>s.stok){ alert('Stok tidak cukup!'); return; }
  var found=null; for(var j=0;j<keranjang.length;j++){ if(keranjang[j].stokId===stokId) found=keranjang[j]; }
  if(found) found.qty+=qty; else keranjang.push({stokId:stokId, tokoId:s.tokoId, produkId:s.produkId, qty:qty, harga:s.hargaJual});
  renderKeranjang();
}
function renderKeranjang(){
  if(keranjang.length===0){ document.getElementById('keranjang').innerHTML='Keranjang kosong'; document.getElementById('keranjang-total').innerHTML=''; return; }
  var html=''; var total=0;
  for(var i=0;i<keranjang.length;i++){ var k=keranjang[i]; var p=getProduk(k.produkId); var sub=k.qty*k.harga; total+=sub; html+='<div class="flex between"><span>'+p.nama+' x '+k.qty+' @ '+fmt(k.harga)+'</span><span><b>'+fmt(sub)+'</b> <button class="btn btn-red btn-sm" onclick="hapusKeranjang('+i+')">X</button></span></div>'; }
  document.getElementById('keranjang').innerHTML=html;
  document.getElementById('keranjang-total').innerHTML='<b>Total: '+fmt(total)+'</b>';
}
function hapusKeranjang(idx){ keranjang.splice(idx,1); renderKeranjang(); }
function checkout(){
  if(keranjang.length===0){ alert('Keranjang kosong!'); return; }
  var tgl=document.getElementById('jual-tgl').value||todayStr();
  for(var i=0;i<keranjang.length;i++){
    var k=keranjang[i]; var p=getProduk(k.produkId); var t=getToko(k.tokoId);
    var total=k.qty*k.harga; var modalTotal=k.qty*p.modal; var laba=total-modalTotal; var komisi=t ? Math.round(total*(t.komisi||0)/100) : 0;
    jualList.unshift({id:Date.now()+i, tokoId:k.tokoId, produkId:k.produkId, qty:k.qty, harga:k.harga, total:total, modal:modalTotal, laba:laba, labaBersih:laba-komisi, komisi:komisi, tgl:tgl});
    var s=getStokToko(k.tokoId, k.produkId); if(s) s.stok-=k.qty;
  }
  keranjang=[]; saveAll(); renderAll(); renderJualProduk(); alert('Checkout berhasil!');
}
function delJual(id){ if(!confirm('Hapus penjualan ini?')) return; jualList=jualList.filter(function(x){ return x.id!==id; }); saveAll(); renderAll(); }
function loadReturProduk(){
  var tokoId=parseInt(document.getElementById('retur-toko').value);
  var html='';
  for(var i=0;i<stokToko.length;i++){ if(stokToko[i].tokoId===tokoId){ var p=getProduk(stokToko[i].produkId); if(p) html+='<option value="'+p.id+'">'+p.nama+' (Stok: '+stokToko[i].stok+')</option>'; } }
  document.getElementById('retur-produk').innerHTML=html;
}
function saveRetur(){
  var tokoId=parseInt(document.getElementById('retur-toko').value); var produkId=parseInt(document.getElementById('retur-produk').value); var jml=parseInt(document.getElementById('retur-jumlah').value)||0;
  if(!jml){ alert('Jumlah wajib!'); return; }
  var s=getStokToko(tokoId, produkId); if(!s || jml>s.stok){ alert('Stok toko tidak cukup!'); return; }
  s.stok-=jml;
  var p=getProduk(produkId);
  if(document.getElementById('retur-alasan').value!=='Rusak' && document.getElementById('retur-alasan').value!=='Kadaluarsa'){ p.stokGudang+=jml; }
  returList.unshift({id:Date.now(), tokoId:tokoId, produkId:produkId, jumlah:jml, alasan:document.getElementById('retur-alasan').value, tgl:document.getElementById('retur-tgl').value||todayStr(), ket:document.getElementById('retur-ket').value});
  saveAll(); renderAll(); alert('Retur tersimpan!');
}
function delRetur(id){ returList=returList.filter(function(x){ return x.id!==id; }); saveAll(); renderAll(); }
function saveSetoran(){
  var tokoId=parseInt(document.getElementById('setoran-toko').value); var jml=parseInt(document.getElementById('setoran-jumlah').value)||0;
  if(!jml){ alert('Jumlah wajib!'); return; }
  setoranList.unshift({id:Date.now(), tokoId:tokoId, jumlah:jml, tgl:document.getElementById('setoran-tgl').value||todayStr(), metode:document.getElementById('setoran-metode').value});
  saveAll(); renderAll(); alert('Setoran tersimpan!');
}
function delSetoran(id){ setoranList=setoranList.filter(function(x){ return x.id!==id; }); saveAll(); renderAll(); }
function savePengaturan(){
  setting.nama=document.getElementById('set-nama').value; setting.alamat=document.getElementById('set-alamat').value; setting.wa=document.getElementById('set-wa').value; setting.rek=document.getElementById('set-rek').value;
  setting.minStok=parseInt(document.getElementById('set-min-stok').value)||5; setting.komisiDefault=parseInt(document.getElementById('set-komisi').value)||20;
  saveAll(); renderAll(); alert('Pengaturan tersimpan!');
}
function resetData(){ if(!confirm('Reset semua data?')) return; localStorage.clear(); location.reload(); }
function renderToko(){
  var q=(document.getElementById('search-toko').value||'').toLowerCase(); var st=document.getElementById('filter-toko-status').value;
  var html='';
  for(var i=0;i<tokoList.length;i++){
    var t=tokoList[i]; if(q && t.nama.toLowerCase().indexOf(q)===-1) continue; if(st!=='all' && t.status!==st) continue;
    var omzet=0; for(var j=0;j<jualList.length;j++){ if(jualList[j].tokoId===t.id) omzet+=jualList[j].total||0; }
    var stokCount=0; for(var s=0;s<stokToko.length;s++){ if(stokToko[s].tokoId===t.id) stokCount+=stokToko[s].stok; }
    html+='<div class="card"><div class="flex between"><h3>'+t.nama+'</h3><span class="badge '+(t.status==='Aktif'?'badge-green':'badge-gray')+'">'+t.status+'</span></div><p class="small muted">'+(t.kota||'')+' • PIC '+(t.pemilik||'')+' • WA '+(t.wa||'')+'</p><p class="small mt">Komisi: <b>'+t.komisi+'%</b> • Stok: <b>'+stokCount+'</b> • Omzet: <b>'+fmt(omzet)+'</b></p><div class="flex wrap mt"><button class="btn btn-blue btn-sm" onclick="editToko('+t.id+')">✏️ Edit</button><button class="btn btn-red btn-sm" onclick="delToko('+t.id+')">🗑️ Hapus</button></div></div>';
  }
  document.getElementById('list-toko').innerHTML=html||'<p>Belum ada toko</p>';
}
function renderProduk(){
  var q=(document.getElementById('search-produk').value||'').toLowerCase(); var kat=document.getElementById('filter-kategori').value;
  var html='';
  for(var i=0;i<produkList.length;i++){
    var p=produkList[i]; if(q && p.nama.toLowerCase().indexOf(q)===-1 && (p.barcode||'').indexOf(q)===-1) continue; if(kat!=='all' && p.kategori!==kat) continue;
    var margin=p.jual-p.modal; var marginPersen=p.modal>0?Math.round(margin/p.modal*100):0;
    var stokTokoTotal=0; for(var s=0;s<stokToko.length;s++){ if(stokToko[s].produkId===p.id) stokTokoTotal+=stokToko[s].stok; }
    html+='<div class="card"><div class="flex between"><h3>'+p.nama+'</h3><span class="badge badge-blue">'+p.kategori+'</span></div><p class="small muted">Barcode: '+(p.barcode||'')+'</p><p class="small mt">Modal: '+fmt(p.modal)+' • Jual: <b>'+fmt(p.jual)+'</b><br>Margin: <b>'+fmt(margin)+' ('+marginPersen+'%)</b><br>Stok Gudang: <b>'+p.stokGudang+'</b> • Stok di Toko: <b>'+stokTokoTotal+'</b></p><div class="flex wrap mt"><button class="btn btn-blue btn-sm" onclick="editProduk('+p.id+')">✏️ Edit</button><button class="btn btn-yellow btn-sm" onclick="tambahStokGudang('+p.id+')">+ Stok</button><button class="btn btn-red btn-sm" onclick="delProduk('+p.id+')">🗑️ Hapus</button></div></div>';
  }
  document.getElementById('list-produk').innerHTML=html||'<p>Belum ada produk</p>';
}
function renderTitip(){
  var html='';
  for(var i=0;i<titipList.length;i++){ var t=titipList[i]; var toko=getToko(t.tokoId); var p=getProduk(t.produkId); html+='<tr><td>'+t.tgl+'</td><td>'+(toko?toko.nama:'')+'</td><td>'+(p?p.nama:'')+'</td><td>'+t.jumlah+'</td><td><span class="badge badge-green">'+t.status+'</span></td><td><button class="btn btn-red btn-sm" onclick="delTitip('+t.id+')">Hapus</button></td></tr>'; }
  document.getElementById('table-titip').innerHTML=html||'<tr><td colspan="6" style="text-align:center">Belum ada titip</td></tr>';
  var optToko=''; for(var j=0;j<tokoList.length;j++) optToko+='<option value="'+tokoList[j].id+'">'+tokoList[j].nama+'</option>';
  var optProduk=''; for(var k=0;k<produkList.length;k++) optProduk+='<option value="'+produkList[k].id+'">'+produkList[k].nama+' - Stok '+produkList[k].stokGudang+'</option>';
  document.getElementById('titip-toko').innerHTML=optToko; document.getElementById('titip-produk').innerHTML=optProduk; document.getElementById('opname-produk').innerHTML=optProduk;
}
function renderStok(){
  var tokoFilter=document.getElementById('stok-filter-toko').value; var q=(document.getElementById('stok-search').value||'').toLowerCase();
  var totalGudang=0; var totalToko=0; var nilaiGudang=0;
  for(var i=0;i<produkList.length;i++){ totalGudang+=produkList[i].stokGudang||0; nilaiGudang+= (produkList[i].stokGudang||0)*produkList[i].modal; }
  for(var s=0;s<stokToko.length;s++) totalToko+=stokToko[s].stok;
  document.getElementById('stok-gudang-total').innerText=totalGudang; document.getElementById('stok-toko-total').innerText=totalToko; document.getElementById('nilai-stok').innerText=fmt(nilaiGudang);
  var html='';
  for(var j=0;j<stokToko.length;j++){
    var st=stokToko[j]; if(tokoFilter!=='all' && st.tokoId!==parseInt(tokoFilter)) continue;
    var p=getProduk(st.produkId); var t=getToko(st.tokoId); if(!p||!t) continue; if(q && p.nama.toLowerCase().indexOf(q)===-1) continue;
    html+='<tr><td>'+p.nama+'</td><td>'+t.nama+'</td><td><b>'+st.stok+'</b> '+(st.stok<=setting.minStok?'<span class="badge badge-red">Menipis!</span>':'')+'</td><td>'+fmt(st.hargaJual)+'</td><td>'+fmt(st.stok*st.hargaJual)+'</td><td><span class="small muted">Titip via menu Titip</span></td></tr>';
  }
  document.getElementById('table-stok').innerHTML=html||'<tr><td colspan="6" style="text-align:center">Belum ada stok di toko</td></tr>';
  var optToko='<option value="all">Semua Toko</option>'; for(var k=0;k<tokoList.length;k++) optToko+='<option value="'+tokoList[k].id+'">'+tokoList[k].nama+'</option>';
  document.getElementById('stok-filter-toko').innerHTML=optToko;
  var opHtml=''; for(var o=0;o<opnameList.slice(0,5).length;o++){ var op=opnameList[o]; var pp=getProduk(op.produkId); opHtml+='<div>'+op.tgl+' - '+(pp?pp.nama:'')+' : '+op.stokLama+' → '+op.stokBaru+'</div>'; }
  document.getElementById('table-opname').innerHTML=opHtml;
}
function renderJual(){
  var html='';
  for(var i=0;i<jualList.length;i++){ var j=jualList[i]; var t=getToko(j.tokoId); var p=getProduk(j.produkId); html+='<tr><td>'+j.tgl+'</td><td>'+(t?t.nama:'')+'</td><td>'+(p?p.nama:'')+'</td><td>'+j.qty+'</td><td>'+fmt(j.total)+'</td><td>'+fmt(j.labaBersih||0)+'</td><td><button class="btn btn-red btn-sm" onclick="delJual('+j.id+')">Hapus</button></td></tr>'; }
  document.getElementById('table-jual').innerHTML=html||'<tr><td colspan="7" style="text-align:cfunction renderJual(){
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
