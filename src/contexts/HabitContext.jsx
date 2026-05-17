import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { getTodayKey } from '../utils/helpers';

const HabitContext = createContext(null);

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const data = await api.get('/habits');
      setHabits(data.habits || []);
      const compMap = {};
      (data.completions || []).forEach((c) => {
        if (!compMap[c.date]) compMap[c.date] = [];
        compMap[c.date].push(c.habitId);
      });
      setCompletions(compMap);
    } catch (err) {
      console.error('Failed to load habits:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleHabit = async (id) => {
    const today = getTodayKey();
    const data = await api.post(`/habits/${id}/toggle`, { date: today });
    setCompletions((prev) => {
      const next = { ...prev, [today]: [...(prev[today] || [])] };
      if (data.completed) {
        if (!next[today].includes(id)) next[today].push(id);
      } else {
        next[today] = next[today].filter((hid) => hid !== id);
      }
      return next;
    });
  };

  const addHabit = async (habit) => {
    const data = await api.post('/habits', habit);
    setHabits((prev) => [...prev, data]);
  };

  const updateHabit = async (id, updates) => {
    const data = await api.put(`/habits/${id}`, updates);
    setHabits((prev) => prev.map((h) => (h._id === id ? data : h)));
  };

  const deleteHabit = async (id) => {
    await api.delete(`/habits/${id}`);
    setHabits((prev) => prev.filter((h) => h._id !== id));
    setCompletions((prev) => {
      const next = {};
      Object.entries(prev).forEach(([date, ids]) => {
        const filtered = ids.filter((hid) => hid !== id);
        if (filtered.length) next[date] = filtered;
      });
      return next;
    });
  };

  return (
    <HabitContext.Provider
      value={{ habits, completions, loading, toggleHabit, addHabit, updateHabit, deleteHabit, refresh: fetchData }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const ctx = useContext(HabitContext);
  if (!ctx) throw new Error('useHabits must be used inside HabitProvider');
  return ctx;
};