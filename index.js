import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  Clock, 
  Settings, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  Search,
  Bell,
  User,
  Trash2,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  PieChart,
  LogOut,
  Save,
  ShieldAlert,
  X,
  Menu,
  Check
} from 'lucide-react';

// --- დამხმარე კომპონენტები ---

// Toast შეტყობინება (წარმატება/შეცდომა)
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right-10 duration-300 z-50 ${
      type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
    }`}>
      {type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      <span className="font-medium text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70"><X size={14}/></button>
    </div>
  );
};

// შეტყობინებების Dropdown
const NotificationsDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-200">
      <div className="p-4 border-b border-slate-50 flex justify-between items-center">
        <h4 className="font-semibold text-slate-800">შეტყობინებები</h4>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={16}/></button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {[
          { id: 1, text: "გიორგიმ დაასრულა 'API ინტეგრაცია'", time: "2 წუთის წინ", icon: CheckCircle2, color: "text-emerald-500" },
          { id: 2, text: "ახალი კომენტარი: 'დიზაინი'", time: "1 საათის წინ", icon: User, color: "text-blue-500" },
          { id: 3, text: "ვადა იწურება: 'React კომპონენტები'", time: "5 საათის წინ", icon: Clock, color: "text-amber-500" },
        ].map(n => (
          <div key={n.id} className="p-4 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex gap-3 transition-colors cursor-pointer">
            <n.icon size={18} className={`mt-1 ${n.color}`} />
            <div>
              <p className="text-sm text-slate-700 font-medium">{n.text}</p>
              <p className="text-xs text-slate-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 text-center border-t border-slate-50">
        <button className="text-xs text-indigo-600 font-medium hover:underline">ყველას ნახვა</button>
      </div>
    </div>
  );
};

// --- მთავარი ხედები ---

// 1. განახლებული კალენდარი
const CalendarView = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  
  // კორექცია, რომ კვირა 0-დან კი არა, ორშაბათიდან დაიწყოს (თუ გვინდა). 
  // ამ შემთხვევაში ვტოვებთ კვირას როგორც პირველ დღეს სტანდარტულად.

  const monthNames = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const getTasksForDay = (day) => {
    return tasks.filter(task => {
        if(!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        return taskDate.getDate() === day && taskDate.getMonth() === month && taskDate.getFullYear() === year;
    });
  };

  const priorityColor = {
      High: "bg-rose-500",
      Medium: "bg-amber-500",
      Low: "bg-emerald-500"
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-in fade-in duration-300 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          {monthNames[month]} <span className="text-slate-400 font-light">{year}</span>
        </h2>
        <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-xl border border-slate-100">
          <button onClick={prevMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"><ChevronLeft size={20} /></button>
          <button onClick={goToToday} className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all">დღეს</button>
          <button onClick={nextMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"].map(d => (
            <div key={d} className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider py-2">
                {d}
            </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-5 gap-px bg-slate-100 border border-slate-200 rounded-xl overflow-hidden flex-1 min-h-[500px]">
        {Array(firstDay).fill(null).map((_, i) => (
          <div key={`blank-${i}`} className="bg-slate-50/50"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const dayTasks = getTasksForDay(day);
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === new Date().getFullYear();
            
            return (
                <div key={day} className={`bg-white p-2 min-h-[100px] hover:bg-slate-50 transition-colors flex flex-col group relative ${isToday ? 'bg-indigo-50/30' : ''}`}>
                    <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1 ${isToday ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-700'}`}>
                        {day}
                    </span>
                    
                    <div className="space-y-1 flex-1 overflow-hidden">
                        {dayTasks.map(t => (
                            <div key={t.id} className="text-[10px] pl-1.5 py-0.5 rounded truncate bg-slate-100 text-slate-600 font-medium border-l-2 relative hover:scale-105 transition-transform cursor-pointer" style={{ borderLeftColor: t.priority === 'High' ? '#f43f5e' : t.priority === 'Medium' ? '#f59e0b' : '#10b981' }}>
                                {t.title}
                            </div>
                        ))}
                    </div>
                    {/* Add button visible on hover */}
                    <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 text-indigo-500 hover:bg-indigo-50 p-1 rounded transition-all">
                        <Plus size={14} />
                    </button>
                </div>
            );
        })}
      </div>
    </div>
  );
};

// 2. ანალიტიკის ხედი (უცვლელი, მაგრამ იღებს გაფილტრულ ტასკებს)
const AnalyticsView = ({ tasks }) => {
  const total = tasks.length || 1;
  const completed = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'inprogress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;

  const high = tasks.filter(t => t.priority === 'High').length;
  const medium = tasks.filter(t => t.priority === 'Medium').length;
  const low = tasks.filter(t => t.priority === 'Low').length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <PieChart size={20} className="text-indigo-600"/> სტატუსების განაწილება
        </h3>
        <div className="space-y-6">
            {[{l: "დასრულებული", v: completed, c: "bg-emerald-500", tc: "text-emerald-600"}, {l: "პროცესშია", v: inProgress, c: "bg-amber-500", tc: "text-amber-600"}, {l: "შესასრულებელი", v: todo, c: "bg-indigo-500", tc: "text-indigo-600"}].map((item, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">{item.l}</span>
                        <span className={`font-bold ${item.tc}`}>{Math.round((item.v/total)*100)}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.c} rounded-full transition-all duration-1000`} style={{ width: `${(item.v/total)*100}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-rose-500"/> პრიორიტეტები
        </h3>
        <div className="flex items-end justify-around h-48 pt-4 border-b border-slate-100">
            {[{l: "High", v: high, c: "bg-rose-100 hover:bg-rose-200"}, {l: "Medium", v: medium, c: "bg-amber-100 hover:bg-amber-200"}, {l: "Low", v: low, c: "bg-emerald-100 hover:bg-emerald-200"}].map((item, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 group w-full h-full justify-end">
                    <div className={`w-12 rounded-t-lg relative transition-all duration-500 ${item.c}`} style={{ height: `${Math.max((item.v/total)*100, 5)}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {item.v} დავალება
                        </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500">{item.l}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// 3. პარამეტრების ხედი (განახლებული შენახვის ფუნქციით)
const SettingsView = ({ onClearData, onSave }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(); // იძახებს Toast-ს მშობელ კომპონენტში
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-right-8 duration-500">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <User className="text-indigo-600"/> პროფილის პარამეტრები
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-all overflow-hidden">
                            <User size={40} />
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-medium">
                            შეცვლა
                        </div>
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">სახელი</label>
                                <input type="text" defaultValue="Giorgi" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">გვარი</label>
                                <input type="text" defaultValue="Dev" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">ელ-ფოსტა</label>
                            <input type="email" defaultValue="giorgi@example.com" className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-slate-50">
                    <button type="submit" className="flex items-center gap-2 bg-slate-800 text-white px-6 py-2.5 rounded-xl hover:bg-slate-700 transition-all active:scale-95 shadow-lg shadow-slate-200">
                        <Save size={18} /> ცვლილებების შენახვა
                    </button>
                </div>
            </form>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100">
                <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                    <ShieldAlert className="text-red-500"/> საფრთხის ზონა
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                    მონაცემების გასუფთავება წაშლის ყველა დავალებას Local Storage-დან. ამ მოქმედების უკან დაბრუნება შეუძლებელია.
                </p>
                <button 
                    type="button"
                    onClick={onClearData}
                    className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-6 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95"
                >
                    <Trash2 size={18} /> ყველა მონაცემის წაშლა
                </button>
            </div>
        </div>
    )
}

// --- არსებული მცირე კომპონენტები ---

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} shadow-lg shadow-indigo-100/50`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-emerald-500 font-medium flex items-center bg-emerald-50 px-2 py-0.5 rounded-full">
        <TrendingUp size={14} className="mr-1" /> {change}
      </span>
      <span className="text-slate-400 ml-2">წინა თვესთან შედარებით</span>
    </div>
  </div>
);

const KanbanColumn = ({ title, count, status, children, onAdd }) => (
  <div className="flex-1 min-w-[300px]">
    <div className="flex items-center justify-between mb-4 sticky top-0 bg-slate-50 py-2 z-10">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-slate-700">{title}</h3>
        <span className="bg-white text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold border border-slate-200 shadow-sm">
          {count}
        </span>
      </div>
      <button 
        onClick={() => onAdd(status)}
        className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-500 transition-all border border-transparent hover:border-slate-200"
      >
        <Plus size={18} />
      </button>
    </div>
    <div className="space-y-3 pb-2">
      {children}
    </div>
  </div>
);

const TaskCard = ({ task, onMove, onDelete }) => {
  const priorityColors = {
    High: "bg-rose-50 text-rose-600 border-rose-100",
    Medium: "bg-amber-50 text-amber-600 border-amber-100",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 group hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-grab active:cursor-grabbing relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${task.priority === 'High' ? 'bg-rose-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
      <div className="flex justify-between items-start mb-2 pl-2">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
          className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-1 rounded transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <h4 className="font-bold text-slate-800 mb-1 pl-2 text-sm">{task.title}</h4>
      <p className="text-slate-500 text-xs mb-3 pl-2 line-clamp-2 leading-relaxed">{task.description}</p>
      
      <div className="flex items-center justify-between pt-3 border-t border-slate-50 pl-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
           <CalendarIcon size={12}/> 
           <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString('ka-GE', {month: 'short', day: 'numeric'}) : '-'}</span>
        </div>
        
        <div className="flex gap-1">
            {task.status !== 'todo' && (
                <button onClick={() => onMove(task.id, -1)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="უკან">
                    <ChevronLeft size={14} />
                </button>
            )}
            {task.status !== 'done' && (
                <button onClick={() => onMove(task.id, 1)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="წინ">
                    <ChevronRight size={14} />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

const AddTaskModal = ({ isOpen, onClose, onSave, initialStatus }) => {
  if (!isOpen) return null;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description: desc, priority, status: initialStatus, dueDate: date });
    setTitle(""); setDesc(""); setPriority("Medium");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600"></div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">ახალი დავალება</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-rose-500 transition-colors"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">სათაური</label>
            <input 
              required
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium"
              placeholder="მაგ: დიზაინის შექმნა..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">აღწერა</label>
            <textarea 
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24 resize-none text-sm"
              placeholder="დეტალური აღწერა..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">პრიორიტეტი</label>
                <select 
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white text-sm"
                >
                <option value="Low">დაბალი</option>
                <option value="Medium">საშუალო</option>
                <option value="High">მაღალი</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">ვადა</label>
                <input 
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none bg-white text-slate-600 text-sm"
                />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4 border-t border-slate-50 mt-4">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors font-medium text-sm">გაუქმება</button>
            <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 font-medium text-sm flex justify-center items-center gap-2">
                <Plus size={16}/> დამატება
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- მთავარი აპლიკაცია ---

export default function App() {
  const [activeTab, setActiveTab] = useState('board');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('todo');
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('projectFlowTasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "კვლევა და ანალიზი", description: "კონკურენტების შესწავლა და UX რეპორტი", priority: "High", status: "done", dueDate: todayStr },
      { id: 2, title: "დიზაინის სისტემა", description: "ფერთა პალიტრის და ფონტების შერჩევა", priority: "Medium", status: "inprogress", dueDate: todayStr },
      { id: 3, title: "React კომპონენტები", description: "ღილაკების და ინპუტების შექმნა", priority: "High", status: "todo", dueDate: todayStr },
      { id: 4, title: "API ინტეგრაცია", description: "მომხმარებელთა სიის წამოღება ბექენდიდან", priority: "Low", status: "todo", dueDate: "2023-11-20" },
    ];
  });

  useEffect(() => {
    localStorage.setItem('projectFlowTasks', JSON.stringify(tasks));
  }, [tasks]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const addTask = (taskData) => {
    const newTask = { id: Date.now(), ...taskData };
    setTasks([...tasks, newTask]);
    showToast("დავალება წარმატებით დაემატა");
  };

  const deleteTask = (id) => {
    if(window.confirm("ნამდვილად გსურს წაშლა?")) {
        setTasks(tasks.filter(t => t.id !== id));
        showToast("დავალება წაიშალა", "error");
    }
  };

  const clearAllData = () => {
    if(window.confirm("ნამდვილად გსურს ყველა მონაცემის წაშლა?")) {
        setTasks([]);
        localStorage.removeItem('projectFlowTasks');
        showToast("მონაცემები გასუფთავდა", "error");
    }
  };

  const moveTask = (id, direction) => {
    const statusOrder = ['todo', 'inprogress', 'done'];
    const task = tasks.find(t => t.id === id);
    const currentIndex = statusOrder.indexOf(task.status);
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < statusOrder.length) {
      const newStatus = statusOrder[newIndex];
      setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    }
  };

  const openAddModal = (status) => {
    setModalStatus(status);
    setIsModalOpen(true);
  };

  // ძებნის ლოგიკა
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'done').length,
    pending: tasks.filter(t => t.status !== 'done').length,
    highPriority: tasks.filter(t => t.priority === 'High').length
  };

  const renderContent = () => {
    switch(activeTab) {
        case 'board':
            return (
                <div className="flex flex-col lg:flex-row gap-6 pb-10 overflow-x-auto min-h-[400px]">
                {['todo', 'inprogress', 'done'].map(status => (
                    <KanbanColumn 
                        key={status}
                        title={status === 'todo' ? "შესასრულებელი" : status === 'inprogress' ? "პროცესშია" : "დასრულებული"}
                        count={filteredTasks.filter(t => t.status === status).length} 
                        status={status}
                        onAdd={openAddModal}
                    >
                    {filteredTasks.filter(t => t.status === status).map(task => (
                        <TaskCard key={task.id} task={task} onMove={moveTask} onDelete={deleteTask} />
                    ))}
                    {filteredTasks.filter(t => t.status === status).length === 0 && (
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                                <Plus size={20} className="text-slate-300"/>
                            </div>
                            დავალებები არ არის
                        </div>
                    )}
                    </KanbanColumn>
                ))}
              </div>
            );
        case 'timeline':
            return <CalendarView tasks={filteredTasks} />;
        case 'stats':
            return <AnalyticsView tasks={filteredTasks} />;
        case 'settings':
            return <SettingsView onClearData={clearAllData} onSave={() => showToast("პროფილი წარმატებით განახლდა")} />;
        default:
            return null;
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-30 transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3 text-indigo-600">
                <div className="p-2 bg-indigo-100 rounded-lg shadow-sm">
                    <LayoutDashboard size={24} />
                </div>
                <span className="text-xl font-bold tracking-tight">ProjectFlow</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-slate-600"><X size={20}/></button>
          </div>
          
          <nav className="space-y-1.5 flex-1">
            {[
              { id: 'board', icon: KanbanSquare, label: 'დაფა' },
              { id: 'timeline', icon: CalendarIcon, label: 'კალენდარი' },
              { id: 'stats', icon: TrendingUp, label: 'ანალიტიკა' },
              { id: 'settings', icon: Settings, label: 'პარამეტრები' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="mt-auto pt-6 border-t border-slate-100">
            <button className="flex items-center gap-3 w-full p-2 hover:bg-slate-50 rounded-xl transition-colors text-left group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                GD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-700 truncate">Giorgi Dev</p>
                <p className="text-xs text-slate-400 truncate">Senior Developer</p>
              </div>
              <LogOut size={16} className="text-slate-400 group-hover:text-rose-500 transition-colors"/>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative w-full">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-slate-400 flex-1 max-w-xl">
             <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-600 p-1 hover:bg-slate-100 rounded-lg">
                <Menu size={24} />
            </button>
            <div className="relative w-full max-w-sm hidden sm:block">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ძებნა (მაგ: API)..." 
                    className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-200 rounded-xl py-2 pl-10 pr-4 outline-none text-slate-600 placeholder-slate-400 text-sm transition-all"
                />
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2.5 rounded-full transition-all ${showNotifications ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
            <NotificationsDropdown isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header Text */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">გამარჯობა, გიორგი! 👋</h1>
                <p className="text-slate-500">{new Date().toLocaleDateString('ka-GE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              {(activeTab === 'board' || activeTab === 'timeline') && (
                <button 
                    onClick={() => openAddModal('todo')}
                    className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-200 transition-all active:scale-95 active:shadow-none"
                >
                    <Plus size={20} />
                    ახალი დავალება
                </button>
              )}
            </div>

            {/* Mobile Search - Visible only on mobile */}
            <div className="sm:hidden">
                 <div className="relative w-full">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="დავალებების ძებნა..." 
                        className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 outline-none text-slate-600 text-sm shadow-sm"
                    />
                </div>
            </div>

            {/* Stats Row */}
            {activeTab === 'board' && !searchQuery && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <StatCard title="სულ დავალება" value={stats.total} change="+12%" icon={LayoutDashboard} color="bg-blue-500" />
                    <StatCard title="შესრულებული" value={stats.completed} change="+8%" icon={CheckCircle2} color="bg-emerald-500" />
                    <StatCard title="პროცესშია" value={stats.pending} change="-2%" icon={Clock} color="bg-amber-500" />
                    <StatCard title="მაღალი პრიორიტეტი" value={stats.highPriority} change="+4%" icon={AlertCircle} color="bg-rose-500" />
                </div>
            )}

            {/* Dynamic Content Area */}
            {renderContent()}
            
          </div>
        </div>

        {/* Mobile FAB */}
        <button 
            onClick={() => openAddModal('todo')}
            className="md:hidden absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-300 flex items-center justify-center active:scale-90 transition-transform z-40"
        >
            <Plus size={24} />
        </button>

        {/* Toast Notification Container */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      </main>

      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addTask}
        initialStatus={modalStatus}
      />
    </div>
  );
}
