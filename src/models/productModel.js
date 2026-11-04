import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true 
  },
  descripcion: { 
    type: String, 
    trim: true 
  },
  precio: { 
    type: Number, 
    required: [true, 'El precio es obligatorio'],
    min: 0 
  },
  stock: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  categoria: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: [true, 'La categoría es obligatoria'] 
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);